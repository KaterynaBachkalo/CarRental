import React from "react";
import css from "./MenuModal.module.css";
import { nanoid } from "nanoid";

const INITIAL_PRICE = 30;
const iNCREMENT = 10;
const MAX_PRICE = 500;

const MenuModalPrice = ({ onSelect }) => {
  const handleItemClick = (selectedBrand) => {
    onSelect(selectedBrand);
  };

  let price = INITIAL_PRICE;
  const prices = [];

  while (price <= MAX_PRICE) {
    prices.push(price);
    price += iNCREMENT;
  }

  return (
    <div className={css.dropdownPrice}>
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
  );
};

export default MenuModalPrice;
