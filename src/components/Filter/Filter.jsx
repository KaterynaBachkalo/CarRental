import React, { useState } from "react";
import css from "./Filter.module.css";
import { ReactComponent as IconChevron } from "../../img/chevron.svg";
import MenuModalBrand from "../MenuModal/MenuModalBrand";
import MenuModalPrice from "../MenuModal/MenuModalPrice";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, setFilter } from "../../redux/filterSlice";
import { selectFilter } from "../../redux/selectors";
import { clearState } from "../../redux/carsSlice";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMenuBrandOpen, setMenuBrandOpen] = useState(false);
  const [isMenuPriceOpen, setMenuPriceOpen] = useState(false);

  const [brand, setBrand] = useState(searchParams.get("brand"));
  const [price, setPrice] = useState(searchParams.get("price"));
  const [range, setRange] = useState([
    searchParams.get("from"),
    searchParams.get("to"),
  ]);

  const filter = useSelector(selectFilter);
  const { make, rentalPrice, mileage } = filter;

  const reset = () => {
    setBrand("");
    setPrice("");
    setRange(["", ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (brand === "" && price === "" && range.includes("")) {
      return;
    }

    if (
      (brand === make && price === "" && range.includes("")) ||
      (brand === "" && price === rentalPrice && range.includes("")) ||
      (brand === make && price === rentalPrice && range === mileage) ||
      (brand === "" && price === "" && range === mileage)
    ) {
      return;
    }

    dispatch(
      setFilter({
        make: brand || make,
        rentalPrice: price || rentalPrice,
        mileage: range || mileage,
      })
    );

    if (brand !== "") {
      setSearchParams({
        brand,
      });
    }

    if (price !== "") {
      setSearchParams({
        price,
      });
    }

    if (!range.includes("")) {
      setSearchParams({
        from: range[0],
        to: range[1],
      });
    }

    if ((brand !== "" || make !== "") && price !== "") {
      setSearchParams({
        brand: brand || make,
        price,
      });
    }

    if (
      (brand !== "" || make !== "") &&
      (price !== "" || rentalPrice !== "") &&
      !range.includes("")
    ) {
      setSearchParams({
        brand: brand || make,
        price: price || rentalPrice,
        from: range[0],
        to: range[1],
      });
    }

    reset();
    dispatch(clearState());
  };

  const handleReset = () => {
    reset();
    setSearchParams({});

    if (make !== "" || !mileage.includes("") || rentalPrice !== "") {
      dispatch(clearState());
      dispatch(resetFilter());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setBrand(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  const handleMileageChange = (index, value) => {
    setRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = Number(value);
      return newRange;
    });
  };
  const handleSelectBrandMenu = (selected) => {
    setBrand(selected);
    setMenuBrandOpen(false);
  };

  const handleSelectPriceMenu = (selected) => {
    setPrice(selected);
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
              value={brand}
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
              value={price}
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
                value={range[0]}
                className={css.inputFrom}
                name="from"
                onChange={(e) => handleMileageChange(0, e.target.value)}
              />
              <p className={css.upperLabel}>From</p>
            </div>
            <div className={css.inputLabelWrap}>
              <input
                type="number"
                value={range[1]}
                className={css.inputTo}
                name="to"
                onChange={(e) => handleMileageChange(1, e.target.value)}
              />
              <p className={css.upperLabel}>To</p>
            </div>
          </div>
        </div>
        <button className={css.button}>Search</button>
        <button className={css.button} onClick={handleReset} type="reset">
          Reset
        </button>
      </form>
    </>
  );
};

export default Filter;
