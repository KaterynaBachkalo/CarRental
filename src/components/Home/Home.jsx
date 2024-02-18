import React from "react";
import css from "./Home.module.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className={css.imageWrap}>
        <img
          src="https://ftp.goit.study/img/cars-test-task/volvo_xc90.jpeg"
          alt="car"
          className={css.image}
        />
      </div>

      <h1 className={css.mainTitle}>Car rental in Kyiv</h1>
      <p className={css.text}>
        Arriving in Kyiv on business or as tourists, many people are faced with
        the problem of free movement around the city. Short or long-term car
        rental is the best alternative to public transport or taxi. You get
        complete freedom of movement: you can plan the route by yourself, so you
        don’t have to depend on the bus schedule or the time of car delivery.
      </p>
      <p className={css.text}>
        Our company has been working in this market segment for more than six
        years. During this time, an extensive fleet of modern vehicles was
        created and a dispatch service was organized. You can easily make a
        request and rent a car in Kyiv – just call our office by phone or
        contact us via the Internet. Do not miss the unique chance to
        inexpensively rent a car of the class you need with or without a driver!
      </p>
      <h2 className={css.title}>Carrental</h2>
      <p className={css.text}>
        We currently have more than 30 cars of different brands, classes and
        prices: from the most unpretentious models{" "}
        <span className={css.bluetext}>Subaru Outback</span> to the luxurious{" "}
        <span className={css.bluetext}>Lamborghini Murcielago</span>. In our
        rental company, it is possible to rent cars of different classes from
        economy to supercar.
      </p>
      <p className={css.text}>
        You can choose: a car with a diesel or a gasoline engine, with gas
        equipment and even an electric car;an auto equipped with a manual
        transmission or an automatic one;compact city sedan, spacious station
        wagon with a huge trunk or a powerful all-wheel drive crossover for
        off-roads;a car equipped with parking sensors, climate control, on-board
        computer and other useful functions.
      </p>
      <p className={css.text}>
        We offer to rent a car without or with a qualified driver. The car is
        provided for any period of time at the request of the client: from
        several hours or 1 day to several weeks. If necessary, our staff will
        provide a transfer from the airport or will meet you and your business
        partners at the railway station. A VIP rental car will certainly have a
        positive impact on your image!
      </p>
      <Link to="/catalog" className={css.chooseLink}>
        Choose your car!
      </Link>
    </div>
  );
};

export default Home;
