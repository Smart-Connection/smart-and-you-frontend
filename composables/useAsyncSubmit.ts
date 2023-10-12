import type { Ref } from "vue";
export interface UseAsyncDataReturn<T> {
  submit: () => Promise<T>;
  saving: Ref<boolean>;
}

export function useAsyncSubmit<T>(options: {
  submitApiCall: () => Promise<T>;
  messages?: { success?: string; error?: string };
  callbackSuccess?: CallableFunction;
}): UseAsyncDataReturn<T> {
  const alert = useState("alert");
  const saving = ref(false);

  return {
    submit,
    saving,
  };

  function submit() {
    saving.value = true;

    return options
      .submitApiCall()
      .then((response) => {
        alert.value = {
          type: "success",
          message: options.messages?.success ?? "Action réussi",
          status: true,
        };

        if (options.callbackSuccess) {
          options.callbackSuccess();
        }

        return response;
      })
      .catch((err) => {
        alert.value = {
          type: "error",
          message: options.messages?.success ?? err,
          status: true,
        };
        throw err;
      })
      .finally(() => {
        saving.value = false;
      });
  }
}
