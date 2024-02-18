import React from "react";
import css from "./MenuModal.module.css";
import makes from "../../data/makes.json";

const MenuModalBrand = ({ onSelect }) => {
  const handleItemClick = (selectedBrand) => {
    onSelect(selectedBrand);
  };

  return (
    <div className={css.dropdownBrand}>
      <ul>
        {makes &&
          makes.map((make) => (
            <li
              className={css.item}
              key={make}
              onClick={() => handleItemClick(make)}
            >
              {make}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MenuModalBrand;
