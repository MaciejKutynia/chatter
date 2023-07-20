import Password from "components/Password/Password";
import styles from "../Auth.module.css";

import { ChangeEvent, useEffect, useState } from "react";

import Input, { CustomInputElement } from "components/Input/Input";
import FormComponent from "components/Form/Form";

import { validateEmail, validatePassword } from "utils/validations";
import { Form } from "utils/types";
import { SectionProps } from "views/auth/AuthView";
import { useDispatch } from "react-redux";
import { signIn } from "store/slices/Auth";

type LoginForm = {
  email: string;
  password: string;
};

const Login = ({ isOpen, onClickHandler }: SectionProps) => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState<Form<LoginForm>>({
    values: {
      email: "",
      password: "",
    },
    validities: {
      email: false,
      password: false,
    },
    isValid: false,
  });

  useEffect(() => {
    if (loginData.validities) {
      let valid = true;
      for (const v of Object.values(loginData.validities)) {
        setLoginData((prev) => ({ ...prev, isValid: v && valid }));
      }
    }
  }, [loginData.validities]);

  const onInputChange = (e: ChangeEvent<CustomInputElement>): void => {
    const targetName = e.target.name;
    setLoginData((prev) => ({
      ...prev,
      values: { ...prev.values, [targetName]: e.target.value },
      validities: { ...prev.validities, [targetName]: e.target.isValid },
    }));
  };

  return (
    <div
      className={`${styles.container} ${!isOpen ? styles.open : ""}`}
      onClick={isOpen ? onClickHandler : undefined}>
      <FormComponent
        onSubmit={(e) => dispatch(signIn(e))}
        buttonText="Zaloguj się"
        isFormValid={loginData.isValid}>
        <h3>Zaloguj się</h3>
        <Input
          type="text"
          name="email"
          label="E-mail"
          layout="vertical"
          required
          validate={validateEmail}
          onChange={onInputChange}
          errorMessage={{
            message: "Proszę podać poprawny adres e-mail",
            required: "Proszę podać adres e-mail",
          }}
        />
        <Password
          name="password"
          label="Hasło"
          required
          layout="vertical"
          validate={validatePassword}
          onChange={onInputChange}
          errorMessage={{
            required: "Proszę podać hasło",
            message: "Hasło musi mieć co najmniej 6 znaków",
          }}
        />
      </FormComponent>
    </div>
  );
};

export default Login;
