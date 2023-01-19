import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

import userImage from "./../../../images/header/user.svg";
import authImage from "./../../../images/header/dumbbell.svg";
import arrowImage from "./../../../images/header/arrow.svg";
import Hamburger from "./Hamburger";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {window.location.pathname !== "/" ? (
        <button type="button" onClick={() => navigate(-1)}>
          <img width="29" height="23" src={arrowImage} alt="Auth" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate(isAuth ? "/profile" : "/auth")}
        >
          <img
            src={isAuth ? authImage : userImage}
            width="40"
            height="40"
            alt="Auth"
          />
        </button>
      )}

      <Hamburger />
    </header>
  );
};

export default Header;
