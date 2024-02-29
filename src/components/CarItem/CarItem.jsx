import React, { useState } from "react";
import css from "./CarItem.module.css";
import Modal from "../Modal/Modal";

import { ReactComponent as IconEmptyLike } from "../../img/empty-heart.svg";
import { ReactComponent as IconFillLike } from "../../img/fill-heart.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, deleteFavorites } from "../../redux/carsSlice";
import { selectFavoritesCars } from "../../redux/selectors";

const CarItem = ({ data }) => {
  const {
    img,
    make,
    model,
    year,
    rentalPrice,
    address,
    type,
    functionalities,
    id,
    rentalCompany,
  } = data;
  const adressArr = address.split(",");

  const [isOpenModal, setOpenModal] = useState(false);
  const favorites = useSelector(selectFavoritesCars);

  const dispatch = useDispatch();

  const openModal = () => {
    setOpenModal(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeModal = () => {
    setOpenModal(false);
    document.body.classList.remove("body-scroll-lock");
  };

  const addToFavorite = () => {
    dispatch(addToFavorites(id));
  };

  const deleteFavorite = () => {
    dispatch(deleteFavorites(id));
  };

  return (
    <div className={css.card}>
      <div className={css.wraper}>
        <div className={css.imageWrap}>
          <img className={css.image} src={img} alt={make} />
          {!favorites.includes(id) ? (
            <IconEmptyLike className={css.like} onClick={addToFavorite} />
          ) : (
            <IconFillLike className={css.like} onClick={deleteFavorite} />
          )}
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
      </div>
      <button className={css.button} onClick={openModal}>
        Learn more
      </button>

      {isOpenModal && <Modal onClose={closeModal} key={id} data={data} />}
    </div>
  );
};

export default CarItem;
