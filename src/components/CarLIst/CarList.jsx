import React, { useEffect, useState } from "react";
import CarItem from "../CarItem/CarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCars,
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
        {cars?.map((car) => (
          <CarItem key={car.id} data={car} handleLoadMore={handleLoadMore} />
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
