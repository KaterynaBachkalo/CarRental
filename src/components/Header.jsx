import React from "react";
import Iconlogo from "../img/logo.png";

const Header = () => {
  return (
    <header>
      <div>
        <nav>
          <a href="/">
            <img src={Iconlogo} alt="Logo" width="80px" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
