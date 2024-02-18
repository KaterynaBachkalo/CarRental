import React, { useEffect } from "react";

import css from "./Favorites.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCars,
  selectFavoritesCars,
  selectIsLoading,
} from "../../redux/selectors";
import Loader from "../../components/Loader/Loader";
import CarItem from "../../components/CarItem/CarItem";
import { fetchAllCarsThunk } from "../../redux/operations";
import { clearState } from "../../redux/carsSlice";

const Favorites = () => {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);

  const isLoading = useSelector(selectIsLoading);

  const favorites = useSelector(selectFavoritesCars);

  useEffect(() => {
    dispatch(fetchAllCarsThunk());

    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <div className={css.container}>
      {favorites.length !== 0 ? (
        <div className={css.wrap}>
          {cars
            ?.filter((car) => favorites.includes(car.id))
            .map((car) => (
              <CarItem key={car.id} data={car} />
            ))}
        </div>
      ) : (
        <p className={css.emptyFavorites}>Your favorite cars may be here!</p>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Favorites;
