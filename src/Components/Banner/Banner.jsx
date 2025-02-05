import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { Fade } from "react-awesome-reveal";

const Banner = () => {
  return (
    <section>
      <div className="banner relative my-20">
        <div className="banner-image group overflow-hidden">
          <Link to={"/equipments"}>
            <img
              className="w-full h-[500px] md:h-auto object-cover transition-all duration-500 ease-linear group-hover:scale-105"
              src={banner}
              alt="banner"
            />
          </Link>
        </div>

        <div className="banner-info absolute left-[12%] top-1/2 transform -translate-y-1/2">
          <Fade>
            <h3 className="text-white font-bold text-2xl md:text-5xl">
              End of year 2024 <br />
              sale up to 70%
            </h3>
          </Fade>

          <div className="text-white mt-10 text-xl">
            <span>
              Stock is running low! Secure yours today <br />
              to avoid missing out.
            </span>
          </div>

          <Link
            className="inline-block mt-10 px-11 py-4 text-black bg-white"
            to={"/equipments"}
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
