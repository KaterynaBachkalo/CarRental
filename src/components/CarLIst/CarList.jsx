import React, { useEffect } from "react";
import CarItem from "../CarItem/CarItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCars } from "../../redux/selectors";
import { fetchCarsThunk } from "../../redux/operations";
import css from "./CarList.module.css";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        {cars?.map(
          ({
            img,
            make,
            model,
            year,
            rentalPrice,
            address,
            rentalCompany,
            type,
            functionalities,
            id,
            fuelConsumption,
            engineSize,
            description,
            accessories,
            rentalConditions,
            mileage,
          }) => (
            <CarItem
              key={id}
              img={img}
              make={make}
              model={model}
              year={year}
              rentalPrice={rentalPrice}
              address={address}
              rentalCompany={rentalCompany}
              type={type}
              id={id}
              functionalities={functionalities}
              fuelConsumption={fuelConsumption}
              engineSize={engineSize}
              description={description}
              accessories={accessories}
              rentalConditions={rentalConditions}
              mileage={mileage}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CarList;
