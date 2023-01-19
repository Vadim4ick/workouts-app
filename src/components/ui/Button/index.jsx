import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, callback, style = "purple" }) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={callback}
        className={`${styles.button} ${styles[style]}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
