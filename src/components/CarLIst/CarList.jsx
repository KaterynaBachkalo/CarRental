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

const CarList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreButton = useSelector(selectLoadMoreButton);

  const cars = useSelector(selectCars);
  console.log("cars", cars);
  const isLoading = useSelector(selectIsLoading);

  const filter = useSelector(selectFilter);

  const { make, rentalPrice, mileage } = filter;

  useEffect(() => {
    const queryParams = { page: currentPage, limit: 12 };

    if (make !== "") {
      queryParams.make = make;
      queryParams.page = 1;
    }

    if (rentalPrice !== "" || !mileage.includes("")) {
      queryParams.page = 1;
    }

    dispatch(fetchCarsThunk(queryParams));
  }, [currentPage, dispatch, make, rentalPrice, mileage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => (prevPage += 1));
  };

  useEffect(() => {
    if (
      cars.length === 32 ||
      make !== "" ||
      rentalPrice !== "" ||
      !mileage.includes("")
    ) {
      dispatch(setloadMoreButton(false));
    }
  }, [cars, dispatch, loadMoreButton, make, rentalPrice, mileage]);

  const filteredCarsMake = cars.filter((car) =>
    car.make.toLowerCase().includes(make.toLowerCase())
  );
  console.log("filteredCarsMake", filteredCarsMake);

  const filteredPrice =
    filteredCarsMake.length !== 0
      ? filteredCarsMake.filter(
          (car) =>
            Number(car.rentalPrice.replace("$", "")) <=
            Number(filter.rentalPrice)
        )
      : cars?.filter(
          (car) =>
            Number(car.rentalPrice.replace("$", "")) <=
            Number(filter.rentalPrice)
        );

  console.log("filteredPrice", filteredPrice);

  return (
    <div>
      <div className={css.wrap}>
        {filteredPrice.length !== 0 ? (
          filteredPrice?.map((car) => (
            <CarItem key={car.id} data={car} handleLoadMore={handleLoadMore} />
          ))
        ) : cars.length !== 0 ? (
          cars.map((car) => (
            <CarItem key={car.id} data={car} handleLoadMore={handleLoadMore} />
          ))
        ) : (
          <p className={css.textNotFound}>
            A car with these parameters was not found :(
          </p>
        )}
      </div>

      {isLoading && <Loader />}

      {!isLoading && loadMoreButton && (
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
