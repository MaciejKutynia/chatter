import { ReactNode, useState, ChangeEvent, HTMLProps, useEffect } from "react";

import styles from "./Input.module.css";

type ErrorMessage = {
  required?: ReactNode;
  message?: ReactNode;
};

export type CustomInputElement = HTMLInputElement & {
  isValid?: boolean;
};

export type InputProps = HTMLProps<CustomInputElement> & {
  className?: string;
  layout?: "vertical" | "horizontal";
  validate?: (value: string) => boolean;
  errorMessage?: ErrorMessage;
  onChange?: (e: ChangeEvent<CustomInputElement>) => void;
  suffix?: ReactNode;
};

const Input = (props: InputProps) => {
  const {
    className: propsClasses,
    label,
    layout = "horizontal",
    required,
    validate,
    errorMessage,
    onChange,
    suffix,
    ...rest
  } = props;

  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<ReactNode | undefined>(undefined);

  const verticalClass: string = layout === "vertical" ? styles.vertical : "";

  const onChangeHandler = (e: ChangeEvent<CustomInputElement>) => {
    const error: boolean = !validate?.(e.target.value) || false;
    setIsError(error);
    setMessage(errorMessage?.message);
    e.target.isValid = !error;
    onChange?.(e);
  };

  return (
    <div className={`${styles.root} ${verticalClass}`}>
      {label ? (
        <span>
          {label}
          {required ? <em className={styles.red}>*</em> : null}
        </span>
      ) : null}
      <div className="container">
        <div
          className={`${styles.input} ${isError ? styles.error : ""} ${
            propsClasses ?? ""
          }`}>
          <input {...rest} onChange={onChangeHandler} />
          {suffix}
        </div>
        {isError && <span className={styles.error}>{message}</span>}
      </div>
    </div>
  );
};

export default Input;
