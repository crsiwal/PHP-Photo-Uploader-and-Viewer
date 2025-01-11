// Regular expression to match Indian phone numbers
export const validatePhone = phoneNumber => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phoneNumber);
};
