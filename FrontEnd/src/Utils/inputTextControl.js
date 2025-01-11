const textLimit = (filteredText, limit, upperCase = false) => {
  if (upperCase) {
    filteredText = filteredText.toUpperCase();
  }
  return filteredText.substring(0, limit);
};

export const alphabeticText = (value, limit = Infinity, upperCase = false) => {
  return textLimit(value.replace(/[^a-z A-Z]+/g, "").replace(/ {2,}/g, " "), limit, upperCase);
};

export const alphaNumericText = (value, limit = Infinity, upperCase = false) => {
  return textLimit(value.replace(/[^a-z A-Z0-9]+/g, "").replace(/ {2,}/g, " "), limit, upperCase);
};

export const usernameText = (value, limit = Infinity, upperCase = false) => {
  return textLimit(value.replace(/[^a-zA-Z0-9_]+/g, "").replace(/_{2,}/g, "_"), limit, upperCase);
};

export const numericText = (value, limit = Infinity) => {
  return textLimit(value.replace(/[^0-9]/g, ""), limit);
};

export const anyText = (value, limit = Infinity, upperCase = false) => {
  return textLimit(value, limit, upperCase);
};

export const emailText = (value, limit = Infinity, upperCase = false) => {
  const filter = filteredValue => {
    // Count the number of @ symbols
    const atCount = (filteredValue.match(/@/g) || []).length;

    // If there are multiple @, keep everything before the last @
    if (atCount > 1) {
      // Keep everything up to the last @ and discard anything after it
      const lastAtIndex = filteredValue.lastIndexOf("@");
      filteredValue = filteredValue.substring(0, lastAtIndex);
    }
    return filteredValue;
  };

  const filteredValue = value
    .replace(/[^a-zA-Z0-9.@-_]+/g, "") // Allow letters, digits, ., _, -, and @
    .replace(/_{2,}/g, "_") // Replace multiple underscores with one
    .replace(/@{2,}/g, "@"); // Replace multiple @ with one

  // Apply custom replacements and limit length
  return textLimit(filter(filteredValue), limit);
};
