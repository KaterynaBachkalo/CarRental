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
// import { toast } from "react-toastify";

const CarList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreButton = useSelector(selectLoadMoreButton);

  const cars = useSelector(selectCars);

  const isLoading = useSelector(selectIsLoading);

  const filter = useSelector(selectFilter);

  const { make } = filter;

  // if (filteredCars.length === 0 && (make || mileage || filter.rentalPrice)) {
  //   toast.error(
  //     "A car with these parameters was not found, change the request data"
  //   );
  // }

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

  useEffect(() => {
    if (cars.length === 32) {
      dispatch(setloadMoreButton(false));
    }
  }, [cars, dispatch, loadMoreButton]);

  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(make.toLowerCase())
  );

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
