import { Link } from "react-router-dom";
import { menu } from "./menuBase";

import burgerImage from "./../../../../images/header/hamburger.svg";
import burgerCloseImage from "./../../../../images/header/close.svg";

import styles from "./style.module.scss";
import { useOutsideAlerter } from "../../../../hooks/useOutsideAlerter";
import { useAuth } from "../../../../hooks/useAuth";

const Hamburger = () => {
  const { setIsAuth } = useAuth();

  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsComponentVisible(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <img
          src={isComponentVisible ? burgerCloseImage : burgerImage}
          height="24"
          width="27"
          alt="Auth"
        />
      </button>

      <nav
        className={`${styles.menu} ${isComponentVisible ? styles.show : ""}`}
      >
        <ul>
          {menu.map((item, index) => (
            <li key={`_menu_${index}`}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}

          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Hamburger;
