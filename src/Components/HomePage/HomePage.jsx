import Equipments from "../Equipments/Equipments";
import CategoriesFromDb from "../CategoriesFromDb/CategoriesFromDb";
import MarqueeLatest from "../MarqueeLatest/MarqueeLatest";
import Banner from "../Banner/Banner";
import FooterCards from "../FooterCards/FooterCards";
import Slider from "../Slider/Slider";
import { ThemeContext } from "../../ThemeContext/ThemeContext";
import { useContext } from "react";

const HomePage = () => {
  return (
    <>
      <Slider />
      <CategoriesFromDb />
      <MarqueeLatest />
      <Equipments />
      <Banner />
      <FooterCards />
    </>
  );
};

export default HomePage;
