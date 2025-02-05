import { useContext } from "react";
import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

const Navbar = () => {
  const { user, logOut, cartItems, setCartItems } = useContext(authContext);

  const userName = user?.displayName;
  const location = useLocation();

  const handleUserLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          text: "You have successfully logged out",
          icon: "success",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //handle cart click
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/cart");
  };

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/equipments"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          All Sports Equipments
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/add-equipment"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          Add Equipment
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/my-equipments"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          My Equipments List
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to={"/equipments-list"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          Eq List
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/signin"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/register"}
          className="text-white font-semibold uppercase hover:bg-transparent hover:text-primaryColor"
        >
          Register
        </NavLink>
      </li> */}
    </>
  );

  // handle cart icon click

  return (
    <header>
      <nav className="md:absolute top-0 left-0 z-50 w-full px-0 md:px-10 lg:px-20">
        <div className="navbar bg-[#1E1E1E]">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white z-[100]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>

            {location.pathname !== "/" ? (
              <Link to="/" className="btn btn-ghost text-xl ">
                <img src={logo} alt="Sports" />
              </Link>
            ) : (
              <span className="btn btn-ghost text-xl ">
                <img src={logo} alt="Sports" className="w-[100px] md:w-auto" />
              </span>
            )}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
          </div>
          <div className="navbar-end ">
            <div className="flex flex-col md:flex-row gap-3 hidden md:flex">
              <div
                className="relative cart-icon cursor-pointer"
                onClick={handleCartClick}
              >
                <span className="absolute -left-[20px] -top-[12px] text-white bg-primaryColor font-semibold text-[12px] w-[18px] h-[18px] text-center leading-[18px] inline-block rounded-full">
                  {cartItems.length}
                </span>
                <LuShoppingCart className="text-primaryColor" />
              </div>

              <div className="wish-list">
                <span className="text-primaryColor"></span>
                <FaRegHeart className="text-primaryColor" />
              </div>
            </div>

            {user && (
              <>
                <img
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={userName}
                  data-tooltip-place="top"
                  src={user?.photoURL}
                  alt={userName}
                  className="ml-0 md:ml-2 w-[50px] h-[50px] object-cover rounded-full border hover:cursor-pointer hidden md:flex"
                />
                <Tooltip id="user-tooltip" />
              </>
            )}

            {user ? (
              <Link
                onClick={handleUserLogout}
                className="btn px-1 md:px-4 ml-0 md:ml-2 bg-primaryColor border-primaryColor text-white hover:bg-black hover:border-black"
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/signin"}
                className="btn px-1 md:px-4 ml-0 md:ml-2 bg-primaryColor border-primaryColor text-white hover:bg-black hover:border-black"
              >
                Login
              </Link>
            )}

            {!user && (
              <Link
                to={"/register"}
                className="ml-0 md:ml-2 btn bg-primaryColor border-primaryColor text-white hover:bg-black hover:border-black hidden md:flex"
              >
                register
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
