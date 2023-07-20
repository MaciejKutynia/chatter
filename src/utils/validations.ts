import { emailRegex } from "utils";

export const validatePassword = (value: string): boolean => value?.length >= 6;

export const validateEmail = (value: string): boolean =>
  !!value.match(emailRegex);
