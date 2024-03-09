import { useEffect } from "react";

const useCloseModals = (func, myRef) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        func(false);
      }
    };

    const handleClose = (event) => {
      if (myRef?.current && !myRef?.current.contains(event.target)) {
        func(false);
      }
    };

    window.addEventListener("keyup", handleKeyDown);
    document.addEventListener("mouseup", handleClose);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
      document.removeEventListener("mouseup", handleClose);
    };
  }, [func, myRef]);
};

export default useCloseModals;
