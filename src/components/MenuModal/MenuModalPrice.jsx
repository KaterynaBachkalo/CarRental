import React, { useRef } from "react";
import css from "./MenuModal.module.css";
import { nanoid } from "nanoid";
import useCloseModals from "../services/closeModals";

const INITIAL_PRICE = 30;
const iNCREMENT = 10;
const MAX_PRICE = 500;

const MenuModalPrice = React.forwardRef(({ onSelect, onClose }, ref) => {
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

  useCloseModals(onClose, inputRef, ref);

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
});

export default MenuModalPrice;
