import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AppRoutes from "../../AppRoutes/AppRoutes";

const Root = () => {
  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
};

export default Root;
