export const csv = (csvData, filename = "sample") => {
  // Convert array data to CSV string format
  const csvContent = csvData.map(row => row.join(",")).join("\n");

  // Create a Blob from the CSV data
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Create a link element
  const link = document.createElement("a");

  // Create a URL for the Blob and set as link href
  link.href = URL.createObjectURL(blob);

  // Set the download attribute for the link (filename)
  link.download = `${filename}.csv`;

  // Append the link to the document body and trigger a click
  document.body.appendChild(link);
  link.click();

  // Clean up and remove the link
  document.body.removeChild(link);
};
