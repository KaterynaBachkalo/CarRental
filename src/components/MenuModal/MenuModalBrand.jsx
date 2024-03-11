import React, { useRef } from "react";
import css from "./MenuModal.module.css";
import makes from "../../data/makes.json";
import useCloseModals from "../services/closeModals";

const MenuModalBrand = React.forwardRef(({ onSelect, onClose }, ref) => {
  const handleItemClick = (selectedBrand) => {
    onSelect(selectedBrand);
  };

  const inputRef = useRef(null);

  useCloseModals(onClose, inputRef, ref);

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
});

export default MenuModalBrand;
