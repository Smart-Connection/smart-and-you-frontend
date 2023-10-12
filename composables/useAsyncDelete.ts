export function useAsyncDelete<T>(
  deleteApiCall: (id: string) => Promise<T>,
  callback: () => void
) {
  const deleting = ref(false);
  return { deleteFunction, deleting };

  function deleteFunction(id: string) {
    deleting.value = true;
    const alert = useState("alert");

    return deleteApiCall(id)
      .then(() => {
        alert.value = {
          type: "success",
          message: "Enregistrement supprimé avec succès",
          status: true,
        };
        callback();
      })
      .catch((err) => {
        alert.value = {
          type: "error",
          message: err,
          status: true,
        };
      })
      .finally(() => {
        deleting.value = false;
      });
  }
}
