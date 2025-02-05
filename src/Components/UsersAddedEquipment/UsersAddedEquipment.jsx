import { FaRegHeart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { addItemToCart, getStoredCart } from "../Utility/Utility";
import { useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";

const UsersAddedEquipment = ({ equipment, onDelete }) => {
  const { _id, itemName, price, image } = equipment;
  const navigate = useNavigate();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://sports-zone-server-lime.vercel.app/equipments/${_id}`,
            {
              method: "DELETE",
            }
          );

          const data = await response.json();

          if (data.deletedCount === 1) {
            onDelete(_id);
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the item.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting the item.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleUpdate = () => {
    navigate(`/update-equipment/${_id}`);
  };

  // add to cart
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
    }
  };

  return (
    <>
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
              data-tooltip-id="view-details-tooltip"
              data-tooltip-content="View Details"
              className="cursor-pointer bg-white p-3 rounded-full border border-[#cfcfcf] transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-white"
            >
              <Link to={`/equipments/${_id}`}>
                <FaMagnifyingGlass className="cursor-pointer" />
              </Link>
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
        <div className="flex flex-col md:flex-row gap-4 mt-5 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-500">
          <button
            onClick={handleUpdate}
            className="bg-primaryColor text-white px-2 py-1 text-sm flex-1 border border-primaryColor"
          >
            Update
          </button>
          <button
            className="delete-btn bg-black text-white px-2 py-1 text-sm flex-1 border border-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersAddedEquipment;
