import React, { useEffect, useRef } from "react";
import css from "./MenuModal.module.css";
import makes from "../../data/makes.json";
import useCloseModals from "../services/closeModals";

const MenuModalBrand = ({ onSelect, onClose }) => {
  const handleItemClick = (selectedBrand) => {
    onSelect(selectedBrand);
  };

  const inputRef = useRef(null);

  useCloseModals(onClose);

  return (
    <div className={css.dropdownBrand} ref={inputRef}>
      <div className={css.containerBrand}>
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
    </div>
  );
};

export default MenuModalBrand;
