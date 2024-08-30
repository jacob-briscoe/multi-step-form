export const Regex = {
  phone: /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/,
} as const;

export const RegexError = {
  phone: "Invalid phone number, expected this format: +1 234 567 8900",
} as const;
