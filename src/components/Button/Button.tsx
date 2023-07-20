import React from "react";

import styles from "./Button.module.css";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = (props: ButtonProps) => {
  const { children, className: propsClasses, ...rest } = props;

  return (
    <button className={`${propsClasses} ${styles.root}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
