import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Auth.module.css";

import Login from "views/auth/components/Login";
import Register from "views/auth/components/Register";

import { RootState } from "store";
import { randomNumber } from "utils";
import { useRWD } from "hooks/useMediaQuery";

export interface SectionProps {
  isOpen: boolean;
  onClickHandler: () => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
}

const bubbles = 10;

const Auth = () => {
  const { isMobile } = useRWD();

  const isAuthenticated = useSelector(
    (state: RootState) => state.Auth.isAuthenticated,
  );

  const [bubblesList, setBubblesList] = useState<Bubble[]>([]);

  useEffect(() => {
    setBubblesList(
      Array.from({ length: bubbles }, (_, i) => ({
        x: i % 2 === 0 ? randomNumber(5, 12) : randomNumber(12, 25),
        y: randomNumber(5, 25),
        id: i,
      })),
    );
    return () => setBubblesList([]);
  }, []);

  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);

  if (isAuthenticated) return <Navigate to="/" />;

  const toggleSections = () => setIsRegisterPage((prev) => !prev);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <Login isOpen={isRegisterPage} onClickHandler={toggleSections} />
        <Register isOpen={isRegisterPage} onClickHandler={toggleSections} />
      </div>
      {!isMobile
        ? bubblesList.map((bubble) => (
            <div
              key={bubble.id}
              className={styles.bubble}
              style={{
                left: `${bubble.x * 4}%`,
                top: `${bubble.y * 4}%`,
              }}></div>
          ))
        : null}
    </div>
  );
};

export default Auth;
