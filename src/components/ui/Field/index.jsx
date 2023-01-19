import React from "react";
import style from "./style.module.scss";

function Field({ placeholder, type = "text", value, onChange, required }) {
  return (
    <input
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={style.input}
      required={required}
    />
  );
}

export default Field;
