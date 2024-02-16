import React, { useState } from "react";
import css from "./CarItem.module.css";
import Modal from "../Modal/Modal";

import { ReactComponent as IconEmptyLike } from "../../img/empty-heart.svg";
import { ReactComponent as IconFillLike } from "../../img/fill-heart.svg";

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
  fuelConsumption,
  engineSize,
  description,
  accessories,
  rentalConditions,
  mileage,
}) => {
  const adressArr = address.split(",");

  const [isOpenModal, setOpenModal] = useState(false);

  const openModal = () => {
    setOpenModal(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeModal = () => {
    setOpenModal(false);
    document.body.classList.remove("body-scroll-lock");
  };

  return (
    <div className={css.card}>
      <div className={css.imageWrap}>
        <img className={css.image} src={img} alt={make} />
        <IconEmptyLike className={css.like} />
        <IconFillLike className={css.like} />
      </div>
      <h2 className={css.title}>
        <p>
          {make} <span className={css.titleModel}>{model}</span>, {year}
        </p>
        <p>{rentalPrice}</p>
      </h2>
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
      <button className={css.button} onClick={openModal}>
        Learn more
      </button>

      {isOpenModal && (
        <Modal
          onClose={closeModal}
          key={id}
          img={img}
          make={make}
          model={model}
          year={year}
          rentalPrice={rentalPrice}
          address={address}
          rentalCompany={rentalCompany}
          type={type}
          id={id}
          functionalities={functionalities}
          fuelConsumption={fuelConsumption}
          engineSize={engineSize}
          description={description}
          accessories={accessories}
          rentalConditions={rentalConditions}
          mileage={mileage}
        />
      )}
    </div>
  );
};

export default CarItem;
