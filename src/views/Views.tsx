import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./Views.module.css";

import AuthView from "views/auth/AuthView";
import AppView from "views/app/AppView";

import { AUTH_PREFIX } from "utils/config";
import { useSelector } from "react-redux";
import { RootState } from "store";

const Views = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.Auth.isAuthenticated,
  );
  return (
    <div className={styles.root}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <AppView /> : <Navigate to={AUTH_PREFIX} />
          }
        />
        <Route
          path={AUTH_PREFIX}
          element={
            <Suspense>
              <AuthView />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default Views;
