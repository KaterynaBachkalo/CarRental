import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/catalog">Car list</Link>
    </div>
  );
};

export default Home;
