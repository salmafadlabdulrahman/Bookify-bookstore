import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import BookDetails from "./pages/BookDetails";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ShippingForm from "./forms/ShippingForm";
import PaymentMethod from "./forms/PaymentMethod";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import DataProvider from "./context/DataProvider";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          index: true,
          element: (
            <ProtectedRoute allowedRoles={["user", "admin", "owner"]}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "shop",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin", "owner"]}>
              <Shop />
            </ProtectedRoute>
          ),
        },
        {
          path: "shop/:bookId",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin", "owner"]}>
              <BookDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "about-us",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin", "owner"]}>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute allowedRoles={["admin", "owner"]}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        { path: "shipping", element: <ShippingForm /> },
        { path: "method", element: <PaymentMethod /> },
        { path: "cart", element: <Cart /> },
        { path: "/cart/checkout", element: <Checkout /> },
        { path: "/cart/payment", element: <Payment /> },
        { path: "/cart/shipping", element: <ShippingForm /> },
        { path: "/checkout/success", element: <Success /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <DataProvider>
      <RouterProvider router={router}></RouterProvider>
    </DataProvider>
  );
}

export default App;
