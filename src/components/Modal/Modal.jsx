import React, { useEffect, useRef } from "react";
import css from "./Modal.module.css";
import closeIcon from "../../img/close.svg";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#root-modal");

const Modal = ({
  onClose,
  img,
  make,
  model,
  year,
  rentalPrice,
  address,
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
  const modalRef = useRef(null);

  const adressArr = address.split(",");

  const condition = rentalConditions.split("\n");

  const text = condition[0].split(":").slice(0, 2);

  const miles = mileage.toLocaleString("en-US", { minimumFractionDigits: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose(false);
      }
    };

    const handleClose = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);
    document.body.classList.add("body-scroll-lock");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClose);
      document.body.classList.remove("body-scroll-lock");
    };
  }, [onClose]);

  return (
    modalRoot &&
    createPortal(
      <div className={css.backdrop}>
        <div className={css.container}>
          <div
            className={css.modal}
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button className={css.btnClose} onClick={onClose}>
              <img src={closeIcon} width={24} alt="Close" />
            </button>

            <div className={css.imageWrap}>
              <img className={css.image} src={img} alt={make} />
            </div>
            <h2 className={css.title}>
              <p>
                {make} <span className={css.titleModel}>{model}</span>, {year}
              </p>
            </h2>
            <p className={css.subtitle}>
              {adressArr[1]}
              <span className={css.stroke}></span>
              {adressArr[2]}
              <span className={css.stroke}></span>
              Id: {id}
              <span className={css.stroke}></span>
              Year: {year}
              <span className={css.stroke}></span>
              Type: {type}
            </p>
            <p className={css.subtitle}>
              Fuel Consumption: {fuelConsumption}
              <span className={css.stroke}></span>
              Engine Size: {engineSize}
            </p>
            <p className={css.description}>{description}</p>

            <div className={css.descriptionWrap}>
              <h3 className={css.titleDesc}>
                Accessories and functionalities:
              </h3>
              <p className={css.subtitle}>
                {accessories[0]}
                <span className={css.stroke}></span>
                {accessories[1]}
                <span className={css.stroke}></span>
                {accessories[2]}
              </p>
              <p className={css.subtitle}>
                {functionalities[0]}
                <span className={css.stroke}></span>
                {functionalities[1]}
                <span className={css.stroke}></span>
                {functionalities[2]}
              </p>
            </div>

            <div className={css.descriptionWrap}>
              <h3 className={css.titleDesc}>Rental Conditions: </h3>
              <div className={css.conditionWrap}>
                <div className={css.conditionBtn}>
                  <p className={css.text}>
                    {text[0]}:<span className={css.number}>{text[1]}</span>
                  </p>
                </div>
                <p className={css.conditionBtn}>{condition[1]}</p>
              </div>

              <div className={css.conditionWrap}>
                <p className={css.conditionBtn}>{condition[2]}</p>
                <p className={css.conditionBtn}>
                  Mileage: <span className={css.number}>{miles}</span>
                </p>
                <p className={css.conditionBtn}>
                  Price: <span className={css.number}>{rentalPrice}</span>
                </p>
              </div>
            </div>
            <a href="tel:+380730000000" className={css.button}>
              Rental car
            </a>
          </div>
        </div>
      </div>,

      modalRoot
    )
  );
};

export default Modal;
