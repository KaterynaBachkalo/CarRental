import React from "react";

const CarItem = () => {
  return (
    <>
      {/* <img src={img} alt="Car" />
  <p>
    `${make} ${model}, ${year}`
  </p>
  <p>{rentalPrice}</p>
  <p>
    `${address} | ${rentalCompany} | Premium`
  </p>
  <p>
    `${type} | ${model} | ${id} | ${functionalities[0]}`
  </p> */}
      <img
        src="https://ftp.goit.study/img/cars-test-task/buick_enclave.jpeg"
        alt="Car"
      />
      <p>make model, year</p>
      <p>rentalPrice</p>
      <p>address | rentalCompany | Premium</p>
      <p>type | model | id | functionalities</p>
    </>
  );
};

export default CarItem;
