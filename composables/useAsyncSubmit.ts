import type { Ref } from "vue";
interface UseAsyncDataSubmitReturn<T> {
  submit: () => Promise<T>;
  saving: Ref<boolean>;
}

export function useAsyncSubmit<T>(options: {
  submitApiCall: () => Promise<T>;
  messages?: { success?: string; error?: string };
  callbackSuccess?: CallableFunction;
  noMessage?: boolean;
}): UseAsyncDataSubmitReturn<T> {
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
        if (!options.noMessage) {
          alert.value = {
            type: "success",
            message: options.messages?.success ?? "Action réussi",
            status: true,
          };
        }

        if (options.callbackSuccess) {
          options.callbackSuccess(response);
        }

        return response;
      })
      .catch((err) => {
        alert.value = {
          type: "error",
          message: options.messages?.error ?? err,
          status: true,
        };
        throw err;
      })
      .finally(() => {
        saving.value = false;
      });
  }
}
