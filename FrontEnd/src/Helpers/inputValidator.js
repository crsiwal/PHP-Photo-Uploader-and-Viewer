export const number = text => text.replace(/[^0-9]/g, "");
export const alpha = text => text.replace(/[^a-zA-Z]/g, "");
export const alphaNumeric = text => text.replace(/[^0-9a-zA-Z]/g, "");
