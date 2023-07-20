import React from "react";

import logo from "assets/img/logo.png";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="" />
    </div>
  );
};

export default Nav;
