import React, { useState } from "react";
import css from "./Filter.module.css";
import { ReactComponent as IconChevron } from "../../img/chevron.svg";
import MenuModalBrand from "../MenuModal/MenuModalBrand";
import MenuModalPrice from "../MenuModal/MenuModalPrice";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, setFilter } from "../../redux/filterSlice";
import { selectFilter } from "../../redux/selectors";
import { clearState } from "../../redux/carsSlice";

const Filter = () => {
  const [isMenuBrandOpen, setMenuBrandOpen] = useState(false);
  const [isMenuPriceOpen, setMenuPriceOpen] = useState(false);

  const [make, setMake] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [mileageRange, setMileageRange] = useState(["", ""]);

  const filter = useSelector(selectFilter);

  const reset = () => {
    setMake("");
    setRentalPrice("");
    setMileageRange(["", ""]);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (make === "" && rentalPrice === "" && mileageRange.includes("")) {
      return;
    }

    dispatch(clearState());

    dispatch(
      setFilter({
        make,
        rentalPrice: `$${rentalPrice}`,
        mileage: mileageRange,
      })
    );
    reset();
  };

  const handleReset = () => {
    reset();

    if (
      filter.make !== "" ||
      !filter.mileage.includes("") ||
      filter.rentalPrice !== ""
    ) {
      dispatch(clearState());
      dispatch(resetFilter());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setMake(value);
    } else if (name === "price") {
      setRentalPrice(value);
    }
  };

  const handleMileageChange = (index, value) => {
    setMileageRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = Number(value);
      return newRange;
    });
  };
  const handleSelectBrandMenu = (selected) => {
    setMake(selected);
    setMenuBrandOpen(false);
  };

  const handleSelectPriceMenu = (selected) => {
    setRentalPrice(selected);
    setMenuPriceOpen(false);
  };

  const toggleBrandMenu = () => {
    setMenuBrandOpen(!isMenuBrandOpen);
  };

  const togglePriceMenu = () => {
    setMenuPriceOpen(!isMenuPriceOpen);
  };
  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.labelwrap}>
          <label htmlFor="brand" className={css.label}>
            Car brand
          </label>
          <div className={css.inputContainer}>
            <input
              type="text"
              placeholder="Enter the text"
              name="brand"
              id="brand"
              value={make}
              className={css.inputBrand}
              onChange={handleChange}
            />
            <IconChevron className={css.icon} onClick={toggleBrandMenu} />
            {isMenuBrandOpen && (
              <MenuModalBrand
                onSelect={handleSelectBrandMenu}
                onClose={setMenuBrandOpen}
              />
            )}
          </div>
        </div>
        <div className={css.labelwrap}>
          <label htmlFor="price" className={css.label}>
            Price/ 1 hour
          </label>
          <div className={css.inputContainer}>
            <input
              type="number"
              name="price"
              placeholder="To $"
              id="price"
              value={rentalPrice}
              className={css.inputPrice}
              onChange={handleChange}
            />
            <IconChevron className={css.icon} onClick={togglePriceMenu} />
            {isMenuPriceOpen && (
              <MenuModalPrice
                onSelect={handleSelectPriceMenu}
                onClose={setMenuPriceOpen}
              />
            )}
          </div>
        </div>

        <div className={css.labelwrap}>
          <label htmlFor="mileage" className={css.label}>
            Сar mileage / km
          </label>
          <div className={css.inputwrap}>
            <div className={css.inputLabelWrap}>
              <input
                type="number"
                id="mileage"
                value={mileageRange[0]}
                className={css.inputFrom}
                name="from"
                onChange={(e) => handleMileageChange(0, e.target.value)}
              />
              <p className={css.upperLabel}>From</p>
            </div>
            <div className={css.inputLabelWrap}>
              <input
                type="number"
                value={mileageRange[1]}
                className={css.inputTo}
                name="to"
                onChange={(e) => handleMileageChange(1, e.target.value)}
              />
              <p className={css.upperLabel}>To</p>
            </div>
          </div>
        </div>
        <button className={css.button}>Search</button>
        <button className={css.button} onClick={handleReset}>
          Reset
        </button>
      </form>
    </>
  );
};

export default Filter;
