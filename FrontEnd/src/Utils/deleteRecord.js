import popup from "sweetalert2";
export const handleDelete = async (recordId, remove, records, setRecords) => {
  popup
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4747",
      cancelButtonColor: "#4B49AC",
      confirmButtonText: "Yes, delete it!",
    })
    .then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await remove(recordId);
          if (response) {
            // Update Records by removing current records
            const updatedRecords = records.filter(record => record._id !== recordId);
            // Show success message if record deleted
            popup.fire("Deleted!", "Your record has been deleted.", "success").then(() => {
              setRecords(updatedRecords);
            });
          }
        } catch (error) {
          popup.fire("Unable to Delete!", error.message, "error");
        }
      }
    });
};
