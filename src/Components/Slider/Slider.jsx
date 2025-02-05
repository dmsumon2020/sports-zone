import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "swiper/swiper-bundle.css";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          "https://sports-zone-server-lime.vercel.app/sliders"
        );
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <Swiper slidesPerView={1} loop autoplay={{ delay: 5000 }}>
      {slides.map((slide, index) => (
        <SwiperSlide key={slide._id} className="relative cursor-pointer">
          {/* Slide Background Image */}
          <img
            src={slide.image}
            alt={slide.heading}
            className="w-full h-[400px] md:h-screen object-cover"
          />
          {/* Slide Text Content */}
          <div
            className={`absolute inset-0 flex ${
              index % 2 === 0 ? "md:justify-end" : "md:justify-start"
            } items-center px-1 md:px-5 md:px-20`}
          >
            <div className="md:bg-black bg-opacity-50 text-white p-6 max-w-xl">
              <h3 className="text-sm my-1 md:my-7 uppercase text-primaryColor">
                {slide.subHeading}
              </h3>
              <h2 className="text-xl md:text-3xl font-bold my-2">
                {slide.heading}
              </h2>
              <p className="text-sm my-3 md:my-7">{slide.description}</p>
              <button
                className="bg-primaryColor text-white py-2 px-6"
                onClick={() => navigate("/equipments")}
              >
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
