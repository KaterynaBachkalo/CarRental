import React, { useEffect, useRef, useState } from "react";
import css from "./Filter.module.css";
import { ReactComponent as IconChevron } from "../../img/chevron.svg";
import MenuModalBrand from "../MenuModal/MenuModalBrand";
import MenuModalPrice from "../MenuModal/MenuModalPrice";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, setFilter } from "../../redux/filterSlice";
import { selectFilter } from "../../redux/selectors";
import { clearState } from "../../redux/carsSlice";
import { useSearchParams } from "react-router-dom";
import { ImFilter } from "react-icons/im";
import useCloseModals from "../services/closeModals";

const Filter = () => {
  const dispatch = useDispatch();

  const menuRef = useRef(null);

  const filterRef = useRef(null);

  const itemBrandRef = useRef(null);

  const itemPriceRef = useRef(null);

  const [isFilterActive, setFilterActive] = useState(false);

  useCloseModals(setFilterActive, menuRef, filterRef);

  const [isMenuBrandOpen, setMenuBrandOpen] = useState(false);
  const [isMenuPriceOpen, setMenuPriceOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [price, setPrice] = useState(searchParams.get("price") ?? "");
  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");

  const filter = useSelector(selectFilter);
  const { make, rentalPrice, mileage } = filter;

  useEffect(() => {
    setBrand(searchParams.get("brand") ?? "");
    setPrice(searchParams.get("price") ?? "");
    setFrom(searchParams.get("from") ?? "");
    setTo(searchParams.get("to") ?? "");
  }, [searchParams]);

  const reset = () => {
    setBrand("");
    setPrice("");
    setFrom("");
    setTo("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brand && !price && !from && !to) {
      return;
    }

    dispatch(
      setFilter({
        make: brand,
        rentalPrice: price,
        mileage: [from, to],
      })
    );

    handleSearch();

    dispatch(clearState());
  };

  const params = {};

  const handleSearch = () => {
    brand ? (params.brand = brand) : delete params["brand"];
    price ? (params.price = price) : delete params["price"];
    from ? (params.from = from) : delete params["from"];
    to ? (params.to = to) : delete params["to"];
    setSearchParams(params);
  };

  const handleReset = () => {
    reset();

    if (make || !mileage.includes("") || rentalPrice) {
      dispatch(clearState());
      dispatch(resetFilter());
    }
    setSearchParams({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setBrand(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "from") {
      setFrom(value);
    } else if (name === "to") {
      setTo(value);
    }
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

  const toggleFilter = () => {
    setFilterActive(!isFilterActive);
  };

  return (
    <div className={css.formWrapper}>
      <div className={css.iconWrap} ref={filterRef}>
        <ImFilter className={css.iconFilter} onClick={toggleFilter} />
      </div>

      <form
        className={`${css.form} ${isFilterActive ? css.active : ""}`}
        onSubmit={handleSubmit}
        ref={menuRef}
      >
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
            <IconChevron
              className={css.icon}
              onClick={toggleBrandMenu}
              ref={itemBrandRef}
            />
            {isMenuBrandOpen && (
              <MenuModalBrand
                onSelect={handleSelectBrandMenu}
                onClose={setMenuBrandOpen}
                ref={itemBrandRef}
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
            <IconChevron
              className={css.icon}
              onClick={togglePriceMenu}
              ref={itemPriceRef}
            />
            {isMenuPriceOpen && (
              <MenuModalPrice
                onSelect={handleSelectPriceMenu}
                onClose={setMenuPriceOpen}
                ref={itemPriceRef}
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
                value={from}
                className={css.inputFrom}
                name="from"
                onChange={handleChange}
              />
              <p className={css.upperLabel}>From</p>
            </div>
            <div className={css.inputLabelWrap}>
              <input
                type="number"
                value={to}
                className={css.inputTo}
                name="to"
                onChange={handleChange}
              />
              <p className={css.upperLabel}>To</p>
            </div>
          </div>
        </div>
        <div className={css.buttonWrap}>
          <button className={css.button}>Search</button>
          <button className={css.button} onClick={handleReset} type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
