import type { Ref } from "vue";

type UseAsyncDataPromise<T> = Promise<T> | (() => Promise<T>);

interface UseAsyncDataArgs<T> {
  promise: UseAsyncDataPromise<T>;
  options?: {
    immediate?: boolean;
  };
  callback?: CallableFunction;
}

export interface UseAsyncDataReturn<T> {
  execute: () => Promise<void>;
  promise: UseAsyncDataPromise<T>;
  data: Ref<T | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
  resolved: Ref<boolean>;
  rejected: Ref<boolean>;
  finalized: Ref<boolean>;
  reloading: Ref<boolean>;
  reloaded: Ref<boolean>;
  blocked: Ref<boolean>;
}

export function useAsyncData<T>({
  promise,
  options = {},
  callback,
}: UseAsyncDataArgs<T>): UseAsyncDataReturn<T> {
  const data = ref(null) as Ref<T | null>;

  const error = ref<Error | null>(null);
  const loading = ref(false);
  const resolved = ref(false);
  const rejected = ref(false);
  const reloading = ref(false);
  const reloaded = ref(false);

  // keep track of a last finished to avoid considering a slow API response if a later API call has finished before
  let lastRunIndex = 0;
  let maxFinished = 0; // highest run index among finished API calls
  const isOutdated = (runIndex: number) => runIndex < maxFinished;
  const updateMaxFinished = (runIndex: number) => {
    maxFinished = runIndex;
  };

  const finalized = computed(() => resolved.value || rejected.value);
  // The data is neither available nor in the way of getting available
  // It is a good way to know if the AsyncData promise needs execution: `if(blocked) execute()`
  const blocked = computed(() => !loading.value && !resolved.value);

  const { immediate = true } = options;

  if (immediate) {
    execute(false);
  }

  return {
    execute: () => execute(true),
    promise,
    data,
    error,
    loading,
    resolved,
    rejected,
    finalized,
    reloading,
    reloaded,
    blocked,
  };

  function execute(calledFromOutside: boolean) {
    if (calledFromOutside && typeof promise !== "function") {
      throw new Error(
        'useAsyncData: To call "execute" you need to pass a fonction returning the promise '
      );
    }

    const runIndex = ++lastRunIndex;
    const _promise = typeof promise === "function" ? promise() : promise;

    reloading.value = finalized.value;
    loading.value = true;
    resolved.value = false;
    rejected.value = false;

    return _promise
      .then((response) => {
        if (isOutdated(runIndex)) return;
        data.value = response;
        error.value = null;

        resolved.value = true;
        rejected.value = false;
      })
      .catch((err: Error) => {
        if (isOutdated(runIndex)) return;

        data.value = null;
        error.value = err;

        resolved.value = false;
        rejected.value = true;
      })
      .finally(() => {
        if (isOutdated(runIndex)) return;
        updateMaxFinished(runIndex);

        if (callback) {
          callback();
        }

        loading.value = false;
        reloaded.value = reloading.value;
        reloading.value = false;
      });
  }
}
