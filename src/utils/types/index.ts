export type Form<T> = {
  values: T;
  validities?: {
    [K in keyof T]?: boolean;
  };
  isValid?: boolean;
};
