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

  const { make } = filter;

  useEffect(() => {
    const queryParams = { page: currentPage, limit: 12 };

    if (make !== "") {
      queryParams.make = make;
    }

    dispatch(fetchCarsThunk(queryParams));
  }, [currentPage, dispatch, make]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => (prevPage += 1));
  };

  const filteredCarsMake = cars.filter((car) =>
    car.make.toLowerCase().includes(make.toLowerCase())
  );

  useEffect(() => {
    if (cars.length === 32 || make !== "") {
      dispatch(setloadMoreButton(false));
    }
  }, [cars, dispatch, loadMoreButton, make]);

  return (
    <div>
      <div className={css.wrap}>
        {filteredCarsMake.length !== 0 && cars
          ? filteredCarsMake?.map((car) => (
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
