import React, { useEffect, useState } from "react";
import CarItem from "../CarItem/CarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCars,
  selectFilter,
  selectIsLoading,
  selectLoadMoreButton,
} from "../../redux/selectors";
import { fetchCarsThunk } from "../../redux/operations";
import Loader from "../Loader/Loader";
import css from "./CarList.module.css";
import { setloadMoreButton } from "../../redux/carsSlice";
import { useSearchParams } from "react-router-dom";

const CarList = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

  const { make, rentalPrice, mileage } = filter;

  const [searchParams] = useSearchParams();

  const brand = searchParams.get("brand");
  const price = searchParams.get("price");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [currentPage, setCurrentPage] = useState(1);

  const [filteredCars, setFilteredCars] = useState([]);

  const loadMoreButton = useSelector(selectLoadMoreButton);

  const cars = useSelector(selectCars);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const queryParams = { page: currentPage, limit: 12 };

    if (make || brand) {
      queryParams.make = make || brand;
      queryParams.page = 1;
    }

    if (rentalPrice || !mileage.includes("")) {
      queryParams.page = 1;
    }

    dispatch(fetchCarsThunk(queryParams));
  }, [currentPage, dispatch, make, rentalPrice, mileage, brand]);

  useEffect(() => {
    let tempCars = [...cars];

    if (brand) {
      tempCars = tempCars.filter((car) =>
        car.make.toLowerCase().includes(make.toLowerCase())
      );
    }

    if (price) {
      tempCars = tempCars.filter(
        (car) =>
          Number(car.rentalPrice.replace("$", "")) <=
          Number(rentalPrice || price)
      );
    }

    if (from && to) {
      tempCars = tempCars.filter(
        (car) =>
          car.mileage >= (mileage[0] || from) &&
          car.mileage <= (mileage[1] || to)
      );
    }

    setFilteredCars(tempCars);
  }, [cars, price, from, to, brand, make, mileage, rentalPrice]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => (prevPage += 1));
  };

  useEffect(() => {
    if (brand || price || (from && to)) {
      dispatch(setloadMoreButton(false));
    }
  }, [dispatch, brand, price, from, to]);

  console.log(currentPage);
  console.log(filteredCars.length);

  return (
    <div>
      {isLoading && <Loader />}

      <div className={css.wrap}>
        {filteredCars?.length !== 0 ? (
          filteredCars?.map((car) => (
            <CarItem key={car.id} data={car} handleLoadMore={handleLoadMore} />
          ))
        ) : (
          <p className={css.textNotFound}>
            A car with these parameters was not found :(
          </p>
        )}
      </div>

      {!isLoading && currentPage < 3 && (
        <button
          type="button"
          className={css.LoadMoreBtn}
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default CarList;
