export const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+/g;
export const strongPasswordRegex: RegExp =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g;
export const mediumPasswordRegex: RegExp =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/g;
