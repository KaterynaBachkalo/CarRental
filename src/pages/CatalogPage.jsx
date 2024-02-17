import React from "react";
import Filter from "../components/Filter/Filter";
import CarList from "../components/CarLIst/CarList";
import css from "./stylesPage.module.css";

const CatalogPage = () => {
  return (
    <div className={css.container}>
      <Filter />
      <CarList />
    </div>
  );
};

export default CatalogPage;
