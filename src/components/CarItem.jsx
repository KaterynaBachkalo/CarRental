import React from "react";
import css from "./CarItem.module.css";

const CarItem = ({
  img,
  make,
  model,
  year,
  rentalPrice,
  address,
  rentalCompany,
  type,
  functionalities,
  id,
}) => {
  const adressArr = address.split(",");

  return (
    <div className={css.card}>
      <div className={css.imageWrap}>
        <img className={css.image} src={img} alt="Car" />
      </div>
      <div className={css.title}>
        <p>
          {make} <span className={css.titleModel}>{model}</span>, {year}
        </p>
        <p>{rentalPrice}</p>
      </div>
      <p className={css.subtitle}>
        {adressArr[1]}
        <span className={css.stroke}></span>
        {adressArr[2]}
        <span className={css.stroke}></span>
        {rentalCompany}
        {/* <span className={css.stroke}></span> Premium */}
      </p>
      <p className={css.subtitle}>
        {type}
        <span className={css.stroke}></span>
        {model}
        <span className={css.stroke}></span>
        {id}
        <span className={css.stroke}></span>
        {functionalities[0]}
      </p>
      <a href="/" className={css.button}>
        Learn more
      </a>
    </div>
  );
};

export default CarItem;
