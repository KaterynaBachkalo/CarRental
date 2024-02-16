import React from "react";
import Iconlogo from "../../img/logo.png";
import css from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header>
      <div className={css.container}>
        <nav className={css.navigation}>
          <Link to="/">
            <img className={css.logo} src={Iconlogo} alt="Logo" />
          </Link>
          <Link
            to="/"
            className={`${css.mainLink} ${
              location.pathname === "/" ? css.active : ""
            }`}
          >
            Main
          </Link>
          <Link
            to="/catalog"
            className={`${css.catalogLink} ${
              location.pathname === "/catalog" ? css.active : ""
            }`}
          >
            Car fleet
          </Link>
          <Link
            to="/favorites"
            className={`${css.favoritesLink} ${
              location.pathname === "/favorites" ? css.active : ""
            }`}
          >
            Favorites
          </Link>
          <a className={css.tel} href="tel:+380730000000">
            +380730000000
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
