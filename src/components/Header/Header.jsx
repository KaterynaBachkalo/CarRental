import React, { useState } from "react";
import Iconlogo from "../../img/logo.png";
import css from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { FiAlignRight } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [isBurgerActive, setBurgerActive] = useState(false);

  const handleBurgerClick = () => {
    setBurgerActive(!isBurgerActive);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <Link to="/">
            <img className={css.logo} src={Iconlogo} alt="Logo" />
          </Link>

          <div className={css.wrapperBurger}>
            <FiAlignRight className={css.burger} onClick={handleBurgerClick} />
          </div>
          <div className={css.wrapper}>
            <div
              className={`${css.navigationSection} ${
                isBurgerActive ? css.active : ""
              }`}
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
