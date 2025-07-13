import validator from "validator";

//Email Validation
export const isEmail = (value) => {
  let Val = String(value);
  if (!validator.isEmail(Val)) return "Enter a valid Email";
  if (validator.isEmpty(Val)) return "Email is required";
};

export const NullCheck = (value) => {
  let Val = String(value);
  if (validator.isEmpty(Val.trim())) return "This field is required";
};

export const PhoneNumberValidate = (value) => {
  let Val = String(value);
  if (validator.isEmpty(Val.trim())) return "This field is required";
  // Val = parseInt(Val);
  let sum = Val.split("").reduce((a, b) => a + parseInt(b), 0);
  if (sum === 0) return "Enter a Valid mobile number";
};

export const validateIndianMobileNumber = (value) => {
  const mobileNumberRegex = /^[6-9]\d{9}$/;
  return mobileNumberRegex.test(value) || "Invalid  mobile number";
};
export const ValidateInput = (value, Message) => {
  let Val = String(value);
  if (validator.isEmpty(Val.trim())) return "This field is required";
  // Val = parseInt(Val);
  if (parseInt(value) < 0) return Message;
  let sum = Val.split("").reduce((a, b) => a + parseInt(b), 0);
  if (sum === 0) return Message;
};
