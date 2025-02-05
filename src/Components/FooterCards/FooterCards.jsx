import { FaGift, FaTruck } from "react-icons/fa6";
import "./FooterCards.css";
import { ImSpinner2 } from "react-icons/im";
import { Fade } from "react-awesome-reveal";

const FooterCards = () => {
  return (
    <section className="footer-cards w-8/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Fade triggerOnce={true} delay={300}>
          <div className="shipping-card flex items-center gap-5">
            <div className="text-6xl text-primaryColor">
              <FaTruck />
            </div>
            <div className="space-y-2">
              <h4 className="text-primaryColor text-xl">
                <span className="relative">Free</span>
              </h4>
              <h3 className="text-2xl font-bold">Free Shipping</h3>
              <p className="text-[#858585]">
                Enjoy free shipping on all orders, no minimum required!
              </p>
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true} delay={500}>
          <div className="shipping-card flex items-center gap-5">
            <div className="text-6xl text-primaryColor">
              <ImSpinner2 />
            </div>
            <div className="space-y-2">
              <h4 className="text-primaryColor text-xl">
                <span className="relative">Returns</span>
              </h4>
              <h3 className="text-2xl font-bold">24 Days Return Policy</h3>
              <p className="text-[#858585]">
                A worry-free shopping experience with our 24-Day Return Policy
              </p>
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true} delay={700}>
          <div className="shipping-card flex items-center gap-5">
            <div className="text-6xl text-primaryColor">
              <FaGift />
            </div>
            <div className="space-y-2">
              <h4 className="text-primaryColor text-xl">
                <span className="relative">Gifts</span>
              </h4>
              <h3 className="text-2xl font-bold">Free Coupon Codes</h3>
              <p className="text-[#858585]">
                Unlock amazing deals with our Free Coupon Codes—shop and save
                more today
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default FooterCards;
