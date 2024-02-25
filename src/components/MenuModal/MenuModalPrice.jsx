import React, { useEffect, useRef } from "react";
import css from "./MenuModal.module.css";
import { nanoid } from "nanoid";

const INITIAL_PRICE = 30;
const iNCREMENT = 10;
const MAX_PRICE = 500;

const MenuModalPrice = ({ onSelect, onClose }) => {
  const handleItemClick = (selectedBrand) => {
    onSelect(selectedBrand);
  };

  let price = INITIAL_PRICE;
  const prices = [];

  while (price <= MAX_PRICE) {
    prices.push(price);
    price += iNCREMENT;
  }

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose(false);
      }
    };

    const handleClose = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClose);
    };
  }, [onClose]);

  return (
    <div className={css.dropdownPrice} ref={inputRef}>
      <div className={css.container}>
        <ul>
          {prices.map((price) => (
            <li
              className={css.item}
              key={nanoid()}
              onClick={() => handleItemClick(price)}
            >
              {price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuModalPrice;
