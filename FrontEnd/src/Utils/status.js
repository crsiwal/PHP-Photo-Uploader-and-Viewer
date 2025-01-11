export const handleStatus = async (records, recordId, currentStatus, setRecords, status) => {
  const newStatus = !currentStatus;
  const oldRecords = [...records];
  try {
    const updatedRecords = records.map(record => (record._id === recordId ? { ...record, isActive: newStatus } : record));
    setRecords(updatedRecords);
    await status(recordId, { isActive: newStatus });
  } catch (error) {
    console.error(error);
    const timer = setTimeout(() => {
      setRecords(oldRecords); // Clear the error after 1 seconds
    }, 200);

    // Cleanup the timer on component unmount or when error changes
    return () => clearTimeout(timer);
  }
};
