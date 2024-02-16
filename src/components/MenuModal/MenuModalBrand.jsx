import React from "react";
import css from "./MenuModal.module.css";
import makes from "../../data/makes.json";
import { nanoid } from "nanoid";

const MenuModalBrand = () => {
  return (
    <div className={css.dropdownBrand}>
      <ul>
        {makes &&
          makes.map((make) => (
            <li className={css.item} key={nanoid()}>
              <a href="/">{make}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MenuModalBrand;
