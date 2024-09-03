import { isEmpty, isEmptyArray, isNullOrUndefined } from "./helpers";

// 👉 Required Validator
export const requiredValidator = (
  value,
  fieldname = false,
  customMessage = false,
) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return fieldname
      ? `Please Input ${fieldname}`
      : customMessage
        ? `${customMessage}`
        : "This form is required";

  return (
    !!String(value).trim().length ||
    (fieldname
      ? `Please Input ${fieldname}`
      : customMessage
        ? `${customMessage}`
        : "This form is required")
  );
};

// 👉 Email Validator
export const emailValidator = (value) => {
  if (isEmpty(value)) return true;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) ||
      "Please input email correctly. Email address must contain a “@“ sign and a period (.) Example: jisookim@gmail.com"
    );

  return (
    re.test(String(value)) ||
    "Please input email correctly. Email address must contain a “@“ sign and a period (.) Example: jisookim@gmail.com"
  );
};

export const phoneValidator = (value) => {
  if (!value) return "Please input phone number";
  if (!/^[0-9]+$/.test(value)) return "Phone number must contain only numbers";
  if (!value.startsWith("0")) return "Phone number must start with 0";
  if (value.length < 11 || value.length > 13)
    return "Phone number must be 11 to 13 digits long";

  return true; // Jika semua validasi lulus
};

// 👉 Password Validator
export const passwordValidator = (password) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const validPassword = regExp.test(password);

  return (
    validPassword ||
    "Password must contain at least 8 characters, alphanumeric, and upper and lower case"
  );
};

// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) =>
  value === target || "Konfirmasi password anda tidak sesuai";

// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value);

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  );
};

// 👉 Integer Validator
export const integerValidator = (value) => {
  if (isEmpty(value)) return true;
  if (Array.isArray(value))
    return (
      value.every((val) => /^-?[0-9]+$/.test(String(val))) ||
      "Harus berupa angka"
    );

  return /^-?[0-9]+$/.test(String(value)) || "Harus berupa angka";
};

// 👉 Regex Validator
export const regexValidator = (value, regex) => {
  if (isEmpty(value)) return true;
  let regeX = regex;
  if (typeof regeX === "string") regeX = new RegExp(regeX);
  if (Array.isArray(value))
    return value.every((val) => regexValidator(val, regeX));

  return regeX.test(String(value)) || "The Regex field format is invalid";
};

// 👉 Alpha Validator
export const alphaValidator = (value) => {
  if (isEmpty(value)) return true;

  return (
    /^[A-Z]*$/i.test(String(value)) ||
    "The Alpha field may only contain alphabetic characters"
  );
};

// 👉 URL Validator
export const urlValidator = (value) => {
  if (isEmpty(value)) return true;
  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  return re.test(String(value)) || "URL is invalid";
};

// 👉 Length Validator
export const lengthValidator = (value, length) => {
  if (isEmpty(value)) return true;

  return (
    String(value).length === length || `Panjang minimal  ${length} karakter`
  );
};

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value) => {
  if (isEmpty(value)) return true;
  const valueAsString = String(value);

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || "All Character are not valid";
};
