export const handleNoLineBreak = e => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent line break
  }
};
