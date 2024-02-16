import React from "react";
import Filter from "../components/Filter/Filter";
import CarList from "../components/CarLIst/CarList";
import css from "./Catalog.module.css";

const Catalog = () => {
  return (
    <div className={css.container}>
      <Filter />
      <CarList />
    </div>
  );
};

export default Catalog;
