import React, { useContext } from "react";
import { FaMagnifyingGlass, FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Equipment.css";
import { addItemToCart } from "../Utility/Utility";
import { authContext } from "../../AuthProvider/AuthProvider";

const Equipment = ({ equipment }) => {
  const { _id, itemName, price, image } = equipment;
  const { cartItems, setCartItems } = useContext(authContext);

  const cartItem = {
    id: _id,
    name: itemName,
    price: price,
    image: image,
  };

  const handleAddToCart = (id) => {
    const wasAdded = addItemToCart(cartItem);
    if (wasAdded) {
      setCartItems([...cartItems, cartItem]);
      navigate(`/cart`);
    }
  };

  //view details function
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/equipments/${id}`);
  };

  return (
    <div className="item-card cursor-pointer group">
      <div className="relative">
        <img src={image} alt={itemName} />
        <ul className="product-icon-action flex gap-6 justify-center items-center absolute left-1/2 bottom-[10%] translate-x-[-50%] translate-y-[15px] transition-all duration-500 opacity-0 invisible z-[1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
          {/* Shopping Bag Icon */}
          <li
            onClick={() => handleAddToCart(_id)}
            data-tooltip-id="shopping-bag-tooltip"
            data-tooltip-content="Add to Cart"
            className="cursor-pointer bg-white p-3 rounded-full border border-[#cfcfcf] transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-white"
          >
            <MdOutlineShoppingBag />
          </li>
          <Tooltip id="shopping-bag-tooltip" />

          {/* Magnifying Glass Icon */}
          <li
            onClick={() => handleViewDetails(_id)}
            data-tooltip-id="view-details-tooltip"
            data-tooltip-content="View Details"
            className="cursor-pointer bg-white p-3 rounded-full border border-[#cfcfcf] transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-white"
          >
            <FaMagnifyingGlass className="cursor-pointer" />
          </li>
          <Tooltip id="view-details-tooltip" />

          {/* Heart Icon */}
          <li
            data-tooltip-id="wishlist-tooltip"
            data-tooltip-content="Add to Wishlist"
            className="cursor-pointer bg-white p-3 rounded-full border border-[#cfcfcf] transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-white"
          >
            <FaRegHeart className="cursor-pointer" />
          </li>
          <Tooltip id="wishlist-tooltip" />
        </ul>
      </div>
      <h4 className="text-sm text-center">{itemName}</h4>
      <p className="text-sm text-center font-bold">
        Price: <span className="text-primaryColor">$ {price}</span>
      </p>
    </div>
  );
};

export default Equipment;
