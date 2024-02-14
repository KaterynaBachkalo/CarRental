import React from "react";

const Filter = () => {
  return (
    <>
      <form action="">
        <label htmlFor="">
          Car brand
          <input type="text" placeholder="Enter the text" />
        </label>
        <label htmlFor="">
          Price/ 1 hour
          <input type="text" placeholder="To $" />
        </label>
        <label htmlFor="">
          Сar mileage / km
          <input type="text" placeholder="From" />
          <input type="text" placeholder="To" />
        </label>
        <button>Search</button>
      </form>
    </>
  );
};

export default Filter;
