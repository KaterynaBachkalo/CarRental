import React, { useEffect, useRef } from "react";
import css from "./MenuModal.module.css";
import makes from "../../data/makes.json";

const MenuModalBrand = ({ onSelect, onClose }) => {
  const handleItemClick = (selectedBrand) => {
    onSelect(selectedBrand);
  };

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
    <div className={css.dropdownBrand} ref={inputRef}>
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
