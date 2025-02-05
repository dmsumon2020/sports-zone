import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getStoredCart,
  removeItemFromCart,
  getUserEmail,
} from "../Utility/Utility";
import { authContext } from "../../AuthProvider/AuthProvider";

const ShoppingCart = () => {
  const { cartItems, setCartItems } = useContext(authContext);

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + Number(item.price || 0), 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    const total = calculateSubtotal();

    const userEmail = getUserEmail();
    if (userEmail) {
      // Clear the cart for the current user
      localStorage.removeItem(userEmail);
      setCartItems([]);

      // Show a SweetAlert message
      Swal.fire({
        title: "Thank you for your purchase!",
        text: `Total purchased value is $${total}`,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {/* Page Title Section */}

      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">Shopping Cart</p>
        </h2>
      </section>

      {/* Main Cart Section */}
      <section className="pt-[100px] w-11/12 md:w-8/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:space-x-10">
          {/* Cart Items Section */}
          <div className="cart-items md:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item flex justify-between items-center mb-4 border-b pb-4"
                  >
                    <div className="image">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </div>

                    <div className="info flex-1 ml-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>

                    <div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <aside className="md:w-1/3 p-4 bg-gray-100 rounded-md">
            <h2 className="order-summary text-xl font-semibold mb-4">
              Order Summary
            </h2>
            <p className="mb-4 subtotal">Subtotal: ${calculateSubtotal()}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Checkout
            </button>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
