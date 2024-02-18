import React from "react";
import { ThreeDots } from "react-loader-spinner";
import css from "../Modal/Modal.module.css";

const Loader = () => {
  return (
    <div className={css.spinnerWrapper}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="rgb(52, 112, 255)"
        radius="12"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ left: "50%", top: "50%", position: "absolute" }}
        wrapperClass="modal-wrapper"
      />
    </div>
  );
};

export default Loader;
