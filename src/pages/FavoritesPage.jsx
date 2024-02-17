import React from "react";

import css from "./stylesPage.module.css";

import Favorites from "../components/Favorites/Favorites";

const FavoritesPage = () => {
  return (
    <div className={css.container}>
      <Favorites />
    </div>
  );
};

export default FavoritesPage;
