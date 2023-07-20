import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import styles from "./Password.module.css";
import Input, { InputProps } from "components/Input/Input";
import Button from "components/Button/Button";

type PasswordProps = InputProps & {
  className?: string;
};

const Password = (props: PasswordProps) => {
  const { className: propsClasses, ...rest } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const suffix: React.ReactNode = (
    <Button type="button" onClick={() => setIsPasswordVisible((prev) => !prev)}>
      {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
    </Button>
  );

  return (
    <div className={styles.root}>
      <Input
        type={isPasswordVisible ? "text" : "password"}
        className={`${propsClasses ?? ""} ${styles.input}`}
        suffix={suffix}
        {...rest}
      />
    </div>
  );
};

export default Password;
