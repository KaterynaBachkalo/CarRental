import { useEffect } from "react";

const useCloseModals = (func, myRef, ref) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        func(false);
      }
    };

    const handleClose = (event) => {
      if (
        myRef?.current &&
        !myRef?.current.contains(event.target) &&
        ref?.current &&
        !ref?.current.contains(event.target)
      ) {
        func(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClose);
    };
  }, [func, myRef, ref]);
};

export default useCloseModals;
