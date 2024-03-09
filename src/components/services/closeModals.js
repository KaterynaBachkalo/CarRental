import { useEffect } from "react";

const useCloseModals = (func) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        func();
      }
    };

    const handleClose = (event) => {
      if (!func || !func.current || !func.current.contains(event.target)) {
        func();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClose);
    };
  }, [func]);
};

export default useCloseModals;
