import React from "react";
import css from "./MenuModal.module.css";
import { useSelector } from "react-redux";
import { selectCars } from "../../redux/selectors";
import { nanoid } from "nanoid";

const INITIAL_PRICE = 30;
const iNCREMENT = 10;

const MenuModalPrice = () => {
  const cars = useSelector(selectCars);

  const priceArr = cars.map((car) => parseFloat(car.rentalPrice.slice(1)));

  const maxPrice = Math.max(...priceArr);

  let price = INITIAL_PRICE;
  const prices = [];

  while (price <= maxPrice) {
    prices.push(price);
    price += iNCREMENT;
  }

  return (
    <div className={css.dropdownPrice}>
      <ul>
        {prices.map((price) => (
          <li className={css.item} key={nanoid()}>
            <a href="/">{price}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuModalPrice;
