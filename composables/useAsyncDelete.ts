export function useAsyncDelete<T>(options: {
  delete: (id: string) => Promise<T>;
  callback: () => void;
  messages?: { success?: string; error?: string };
}) {
  const deleting = ref(false);
  return { deleteFunction, deleting };

  function deleteFunction(id: string) {
    deleting.value = true;
    const alert = useState("alert");

    return options
      .delete(id)
      .then(() => {
        alert.value = {
          type: "success",
          message:
            options.messages?.success ?? "Enregistrement supprimé avec succès",
          status: true,
        };
        options.callback();
      })
      .catch((err) => {
        alert.value = {
          type: "error",
          message: options.messages?.error ?? err,
          status: true,
        };
      })
      .finally(() => {
        deleting.value = false;
      });
  }
}
