import Swal from 'sweetalert2';
import { getAuth } from "firebase/auth";

// Function to get the logged-in user's email using Firebase Authentication
const getUserEmail = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (user) {
    return user.email;
  } else {
    return null;
  }
};

// Function to get the stored cart for the logged-in user
const getStoredCart = () => {
  const userEmail = getUserEmail();
  
  if (userEmail) {
    const storedCart = localStorage.getItem(userEmail);
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Function to add an item to the user's cart
const addItemToCart = (item) => {
  const userEmail = getUserEmail();
  
  if (!userEmail) {
    Swal.fire({
      title: 'You must be logged in!',
      text: 'Please log in to add items to the cart.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return false;
  }

  const storedCart = getStoredCart();

  // Check if the item is already in the cart
  const itemExists = storedCart.some(cartItem => cartItem.id === item.id);
  
  
  if (itemExists) {

    Swal.fire({
      title: `${item.name} is already in your cart!`,
      text: 'You can only add the item once to the cart.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
    return false;

  } else {
    // Add the item to the cart
    storedCart.push(item);
    // Update the cart in localStorage
    localStorage.setItem(userEmail, JSON.stringify(storedCart));
    
    Swal.fire({
      title: `${item.name} has been added to your cart!`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    return true;
  }
};

// Function to remove an item from the user's cart
const removeItemFromCart = (itemId) => {
  const userEmail = getUserEmail();
  
  if (!userEmail) {
    Swal.fire({
      title: 'You must be logged in!',
      text: 'Please log in to remove items from the cart.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }

  let storedCart = getStoredCart();

  // Filter out the item with the given ID
  storedCart = storedCart.filter(cartItem => cartItem.id !== itemId);

  // Update the cart in localStorage
  localStorage.setItem(userEmail, JSON.stringify(storedCart));
  
  Swal.fire({
    title: 'Item has been removed from your cart.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

export { getStoredCart, addItemToCart, removeItemFromCart, getUserEmail };
