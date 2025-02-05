import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import Register from "../Components/Register/Register";
import SignIn from "../Components/SignIn/SignIn";
import AddEquipment from "../Components/AddEquipment/AddEquipment";
import PrivateRoute from "./PrivateRoute";
import Equipments from "../Components/Equipments/Equipments";
import EquipmentDetails from "../Components/EquipmentDetails/EquipmentDetails";
import UsersAddedEquipments from "../Components/UsersAddedEquipments/UsersAddedEquipments";
import UpdateEquipment from "../Components/UpdateEquipment/UpdateEquipment";
import EquipmentsList from "../Components/EquipmentsList/EquipmentsList";
import { Helmet } from "react-helmet-async";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";
import NotFound from "../Components/NotFound/NotFound";
import ItemsByCategory from "../Components/ItemsByCategory/ItemsByCategory";
import RecoverPassword from "../Components/RecoverPassword/RecoverPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Helmet>
              <title>Home | Sports Zone</title>
            </Helmet>
            <HomePage />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Helmet>
              <title>Signin | Sports Zone</title>
            </Helmet>
            <SignIn />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Helmet>
              <title>Register | Sports Zone</title>
            </Helmet>
            <Register />
          </>
        }
      />
      <Route
        path="/add-equipment"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Add an Equipment | Sports Zone</title>
            </Helmet>
            <AddEquipment />
          </PrivateRoute>
        }
      />
      <Route
        path="/equipments"
        element={
          <>
            <Helmet>
              <title>All Equipments | Sports Zone</title>
            </Helmet>
            <Equipments />
          </>
        }
      />
      <Route
        path="/equipments-list"
        element={
          <>
            <Helmet>
              <title>List of Equipments | Sports Zone</title>
            </Helmet>
            <EquipmentsList />
          </>
        }
      />
      <Route
        path="/equipments/:id"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Item Details | Sports Zone</title>
            </Helmet>
            <EquipmentDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/:catName"
        element={
          <>
            <ItemsByCategory />
          </>
        }
      />
      <Route
        path="/my-equipments"
        element={
          <PrivateRoute>
            <Helmet>
              <title>My Equipments | Sports Zone</title>
            </Helmet>
            <UsersAddedEquipments />
          </PrivateRoute>
        }
      />
      <Route
        path="/update-equipment/:id"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Update Item | Sports Zone</title>
            </Helmet>
            <UpdateEquipment />
          </PrivateRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Shopping Cart | Sports Zone</title>
            </Helmet>
            <ShoppingCart />
          </PrivateRoute>
        }
      />
      <Route
        path="/recover-password"
        element={
          <>
            <Helmet>
              <title>Recover Password | Sports Zone</title>
            </Helmet>
            <RecoverPassword />
          </>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
