import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.init";
import { getStoredCart } from "../Components/Utility/Utility";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  // states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user using email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update username and photo url during registration

  const updateUsernameAndPhotoUrl = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // sign in/ login
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // this part handles logout
  const logOut = () => {
    return signOut(auth);
  };

  // this part initializes an observer to logged in users
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser) : setUser(null);
      setLoading(false);

      // Retrieve cart items when user state changes
      if (currentUser) {
        const items = getStoredCart();
        setCartItems(items);
      } else {
        setCartItems([]);
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const authInfo = {
    createUser,
    updateUsernameAndPhotoUrl,
    userLogin,
    user,
    logOut,
    loading,
    googleLogin,
    cartItems,
    setCartItems,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
