import React, { useState } from "react";

import css from "../components/CarItem/CarItem.module.css";
import { useSelector } from "react-redux";
import { selectCars, selectIsLoading } from "../redux/selectors";
import Loader from "../components/Loader/Loader";
import CarItem from "../components/CarItem/CarItem";

const Favorites = ({ handleLoadMore }) => {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const [isLastPage, setIsLastPage] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        {cars?.map((car) => (
          <CarItem key={car.id} data={car} />
        ))}
      </div>
      {isLoading && <Loader />}

      {!isLastPage && (
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

export default Favorites;
