import { FormEvent, ReactNode } from "react";

import Button from "components/Button/Button";

type FormProps = {
  children: ReactNode;
  onSubmit: (e: any) => void;
  className?: string;
  buttonText: string;
  isFormValid?: boolean;
};

type Values = {
  [key: string]: string;
};

const Form = (props: FormProps) => {
  const { buttonText, children, isFormValid, onSubmit, ...rest } = props;

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const values: Values = {};

    for (let i = 0; i < target.length; i++) {
      const input = target[i] as HTMLInputElement;
      if (input.value) {
        values[input.name] = input.value;
      }
    }

    onSubmit(values);
  };

  return (
    <form {...rest} onSubmit={onSubmitHandler}>
      {children}
      <Button
        disabled={typeof isFormValid !== "undefined" ? !isFormValid : false}
        type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
