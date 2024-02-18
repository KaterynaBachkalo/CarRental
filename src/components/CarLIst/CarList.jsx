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
import { toast } from "react-toastify";

const CarList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreButton = useSelector(selectLoadMoreButton);

  const cars = useSelector(selectCars);

  const isLoading = useSelector(selectIsLoading);

  const filter = useSelector(selectFilter);

  const { make, mileage, rentalPrice } = filter;
  console.log(filter);

  const applyFilter = (car) => {
    // Перевірка, чи об'єкт car відповідає умовам фільтра

    const makeCondition = car.make.toLowerCase().includes(make.toLowerCase());

    const mileageCondition = car.mileage <= mileage;

    const rentalPriceCondition = car.rentalPrice <= rentalPrice;

    // if (make === "" && mileage && rentalPrice !== "$") {
    //   return mileageCondition && rentalPriceCondition;
    // }

    // if (!mileage && make !== "" && rentalPrice !== "$") {
    //   console.log(1);
    //   return makeCondition && rentalPriceCondition;
    // }

    // if (!mileage && make !== "" && rentalPrice !== "$") {
    //   return makeCondition && rentalPriceCondition;
    // }
    if (make !== "") {
      return makeCondition;
    }

    if (mileage !== "0") {
      return mileageCondition;
    }

    if (rentalPrice !== "$") {
      return rentalPriceCondition;
    }
  };

  const filteredCars = cars.filter(applyFilter);
  console.log(filteredCars);

  if (filteredCars.length === 0 && make !== "") {
    toast.warning("Click link Load More");
  }
  // if (filteredCars.length === 0 && (make || mileage || filter.rentalPrice)) {
  //   toast.error(
  //     "A car with these parameters was not found, change the request data"
  //   );
  // }

  useEffect(() => {
    dispatch(fetchCarsThunk(currentPage));
  }, [currentPage, dispatch]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => (prevPage += 1));
  };

  useEffect(() => {
    if (cars.length === 32) {
      dispatch(setloadMoreButton(false));
    }
  }, [cars, dispatch, loadMoreButton]);

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        {filteredCars.length !== 0 && cars
          ? filteredCars?.map((car) => (
              <CarItem
                key={car.id}
                data={car}
                handleLoadMore={handleLoadMore}
              />
            ))
          : cars?.map((car) => (
              <CarItem
                key={car.id}
                data={car}
                handleLoadMore={handleLoadMore}
              />
            ))}
      </div>
      {isLoading && <Loader />}

      {loadMoreButton && (
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
