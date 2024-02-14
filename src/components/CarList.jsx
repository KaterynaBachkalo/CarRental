import React, { useEffect } from "react";
import CarItem from "./CarItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCars } from "../redux/selectors";
import { fetchCarsThunk } from "../redux/operations";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  console.log(cars);

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  return (
    <>
      {/* {cars?.map(() => ( */}
      <CarItem
        key="9582"
        //   img={img} make={make} model={model} year={year}  rentalPrice={rentalPrice} address={address} rentalCompany={rentalCompany} type={type} id={id} functionalities={functionalities}
      />
      {/* ))} */}
    </>
  );
};

export default CarList;
