import React, { useState, useEffect } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import css from "./ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${css.scroll} ${isVisible ? css.visible : ""}`}>
      <button onClick={scrollToTop}>
        <IoIosArrowDropupCircle />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
