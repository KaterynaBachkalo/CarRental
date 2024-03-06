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

  // --------------------------------------

  let filteredCarsMake = cars?.filter((car) =>
    car.make.toLowerCase().includes(make.toLowerCase())
  );
  //--------------------------------------

  const filteredPrice = filteredCarsMake?.filter((car) => {
    const carRentalPrice = Number(car.rentalPrice.replace("$", ""));
    return carRentalPrice <= Number(rentalPrice);
  });

  //--------------------------------------

  const filteredMileage =
    filteredPrice?.length === 0
      ? filteredCarsMake?.filter(
          (car) => car.mileage >= mileage[0] && car.mileage <= mileage[1]
        )
      : filteredPrice?.filter(
          (car) => car.mileage >= mileage[0] && car.mileage <= mileage[1]
        );

  return (
    <div>
      {!isLoading && (
        <div className={css.wrap}>
          {filteredMileage?.length !== 0 ? (
            filteredMileage?.map((car) => (
              <CarItem
                key={car.id}
                data={car}
                handleLoadMore={handleLoadMore}
              />
            ))
          ) : filteredPrice?.length !== 0 ? (
            filteredPrice?.map((car) => (
              <CarItem
                key={car.id}
                data={car}
                handleLoadMore={handleLoadMore}
              />
            ))
          ) : cars?.length !== 0 ? (
            filteredCarsMake?.map((car) => (
              <CarItem
                key={car.id}
                data={car}
                handleLoadMore={handleLoadMore}
              />
            ))
          ) : filteredPrice === 0 ? (
            <p className={css.textNotFound}>
              A car with these parameters was not found :(
            </p>
          ) : (
            <p className={css.textNotFound}>
              A car with these parameters was not found :(
            </p>
          )}
        </div>
      )}

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
