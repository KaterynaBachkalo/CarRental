import React, { useEffect, useState } from "react";
import css from "./Filter.module.css";
import { ReactComponent as IconChevron } from "../../img/chevron.svg";
import MenuModalBrand from "../MenuModal/MenuModalBrand";
import MenuModalPrice from "../MenuModal/MenuModalPrice";

const Filter = () => {
  const [isMenuBrandOpen, setMenuBrandOpen] = useState(false);
  const [isMenuPriceOpen, setMenuPriceOpen] = useState(false);

  const toggleBrandMenu = () => {
    setMenuBrandOpen(!isMenuBrandOpen);
  };

  const togglePriceMenu = () => {
    setMenuPriceOpen(!isMenuPriceOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        setMenuBrandOpen(false);
        setMenuPriceOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuBrandOpen, isMenuPriceOpen]);

  return (
    <>
      <form className={css.form}>
        <div className={css.labelwrap}>
          <label htmlFor="brand" className={css.label}>
            Car brand
          </label>
          <div className={css.inputContainer}>
            <input
              type="text"
              placeholder="Enter the text"
              id="brand"
              className={css.inputBrand}
            />
            <IconChevron className={css.icon} onClick={toggleBrandMenu} />
            {isMenuBrandOpen && <MenuModalBrand />}
          </div>
        </div>
        <div className={css.labelwrap}>
          <label htmlFor="price" className={css.label}>
            Price/ 1 hour
          </label>
          <div className={css.inputContainer}>
            <input
              type="number"
              placeholder="To $"
              id="price"
              className={css.inputPrice}
            />
            <IconChevron className={css.icon} onClick={togglePriceMenu} />
            {isMenuPriceOpen && <MenuModalPrice />}
          </div>
        </div>

        <div className={css.labelwrap}>
          <label htmlFor="mileage" className={css.label}>
            Сar mileage / km
          </label>
          <div className={css.inputwrap}>
            <div className={css.inputLabelWrap}>
              <input type="number" id="mileage" className={css.inputFrom} />
              <p className={css.upperLabel}>From</p>
            </div>
            <div className={css.inputLabelWrap}>
              <input type="number" className={css.inputTo} />
              <p className={css.upperLabel}>To</p>
            </div>
          </div>
        </div>
        <button type="button" className={css.button}>
          Search
        </button>
      </form>
    </>
  );
};

export default Filter;
