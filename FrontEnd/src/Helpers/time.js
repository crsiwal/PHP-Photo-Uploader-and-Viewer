export const since = dateString => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hrs ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} min ago`;
  return `${seconds} sec ago`;
};

export const format = isoString => {
  const date = new Date(isoString);

  // Get day, month, year, hours, minutes, and seconds
  const day = String(date.getDate()).padStart(2, "0"); // Adds leading 0 if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Return in "dd/mm/yyyy hh:mm:ss" format
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const getDate = (olderDay = 0) => {
  const today = new Date();
  const lastSevenDaysDate = new Date(today);
  lastSevenDaysDate.setDate(today.getDate() - olderDay);
  return formatDate(lastSevenDaysDate);
};

export const formatDate = unFormattedDate => {
  const year = unFormattedDate.getFullYear();
  const month = String(unFormattedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(unFormattedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
