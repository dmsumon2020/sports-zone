import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const MarqueeLatest = () => {
  return (
    <section className="py-20">
      <Marquee
        pauseOnHover={false}
        speed={100}
        className="font-semibold text-3xl md:text-9xl"
      >
        <p>
          SCORE BIG WITH AMAZING DEALS! GEAR UP FOR THE GAME WITH TOP-QUALITY
          SPORTS EQUIPMENT!
        </p>
        <p className="ml-5">
          HURRY, LIMITED TIME OFFERS ON YOUR FAVORITE BRANDS!
        </p>
      </Marquee>
    </section>
  );
};

export default MarqueeLatest;
