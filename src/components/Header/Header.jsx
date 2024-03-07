import React, { useEffect, useRef, useState } from "react";
import Iconlogo from "../../img/logo.png";
import css from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { FiAlignRight } from "react-icons/fi";

const Header = () => {
  const location = useLocation();

  const [isBurgerActive, setBurgerActive] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        setBurgerActive(false);
      }
    };

    const handleClose = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setBurgerActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClose);
    };
  }, [setBurgerActive]);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <div className={css.navWrap}>
            <Link to="/">
              <img className={css.logo} src={Iconlogo} alt="Logo" />
            </Link>

            <FiAlignRight className={css.burger} onClick={setBurgerActive} />
          </div>

          <div className={css.wrapper}>
            <div
              className={`${css.navigationSection} ${
                isBurgerActive ? css.active : ""
              }`}
              ref={menuRef}
            >
              <ul className={css.list}>
                <li>
                  <Link
                    to="/"
                    className={`${css.mainLink} ${
                      location.pathname === "/" ? css.active : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className={`${css.catalogLink} ${
                      location.pathname === "/catalog" ? css.active : ""
                    }`}
                  >
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className={`${css.favoritesLink} ${
                      location.pathname === "/favorites" ? css.active : ""
                    }`}
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
              <a className={css.tel} href="tel:+380730000000">
                Call: +380730000000
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
