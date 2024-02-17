import React from "react";

import css from "./stylesPage.module.css";
import Home from "../components/Home/Home";

const HomePage = () => {
  return (
    <div className={css.container}>
      <Home />
    </div>
  );
};

export default HomePage;
