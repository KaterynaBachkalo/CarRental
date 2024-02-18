import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="rgb(52, 112, 255)"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
