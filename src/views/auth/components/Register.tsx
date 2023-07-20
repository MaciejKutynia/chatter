import styles from "../Auth.module.css";

import { SectionProps } from "views/auth/AuthView";

const Register = ({ isOpen, onClickHandler }: SectionProps) => {
  return (
    <div
      className={`${styles.container} ${isOpen ? styles.open : ""}`}
      onClick={!isOpen ? onClickHandler : undefined}>
      <h3>Zarejestruj się</h3>
      <input type="text" />
      <input type="text" />
      <button>Zaloguj się</button>
    </div>
  );
};

export default Register;
