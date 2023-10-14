import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/home/Home";
import Search from "./screens/search/Search";
import Restaurants from "./screens/menu/Restaurants";
import NotFoundPage from "./screens/404page/404Page";
import Menu from "./screens/menu/Menu";
import Welcome from "./screens/welcome/Welcome";
import RestaurantDash from "./screens/RestaurantOwner/Dashboard/RestaurantDash";
// import Login from "./screens/auth/Login";
import PublicRoute from "./routes/PublicRoute";
import Cart from "./screens/cart/Cart";
import Order from "./screens/RestaurantOwner/Order/Order";
import AllFoods from "./screens/RestaurantOwner/AllFood/AllFoods";
import AddFood from "./screens/RestaurantOwner/AddFood/AddFood";
import Item from "./screens/menu/Item";
import AdminDash from "./screens/admin/Dashboard/AdminDash";
// import AllRestaurant from "./screens/admin/AllRestaurant/AllRestaurant";
import AddRestaurant from "./screens/admin/AddRestaurant/AddRestaurant";
import CheckoutSuccess from "./screens/checkout/CheckoutSuccess";
import PaymentSuccess from "./screens/payment/PaymentSuccess";
import PaymentFail from "./screens/payment/PaymentFail";
import PlaceOrder from "./screens/order/PlaceOrder";
import Product from "./screens/product/Product";
import AllProduct from "./screens/all-product/AllProduct";
import AllRestaurant from "./screens/all-restaurant/AllRestaurant";
import Signin from "./screens/auth/Signin";
import ConfirmOrder from "./screens/confirm-order/ConfirmOrder";
import SingleItem from "./screens/single-item/SingleItem";
import RestaurantPage from "./screens/restaurant-page/RestaurantPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<AllProduct />} />
        <Route path="/item/:id" element={<SingleItem />} />
        <Route path="/restaurants" element={<AllRestaurant />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/confirm-order" element={<PlaceOrder />} />
        <Route path="/restaurant/menu" element={<AllFoods />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/restaurant/resister' element={<AddRestaurant />} />
        <Route path="/restaurant/menu/:id" element={<RestaurantPage />} />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/menu/:city"
          element={
            <>
              <Navbar />
              <Restaurants />
              <Footer />
            </>
          }
        />
        {/* <Route
          path="/menu/restaurant/:restaurant"
          element={
            <>
              <Navbar />
              <Menu />
              <Footer />
            </>
          }
        /> */}

        <Route
          path="/menu/item/:item_id"
          element={
            <>
              <Navbar />
              <Item />
              <Footer />
            </>
          }
        />

        <Route
          path="/restaurant"
          element={<Navigate to={"/restaurant/dashboard"} />}
        />

        <Route path="/restaurant/dashboard" element={<RestaurantDash />} />
        <Route path="/restaurant/order" element={<Order />} />
        <Route path="/restaurant/items" element={<AllFoods />} />
        <Route path="/restaurant/add-items" element={<AddFood />} />

        <Route path="/admin" element={<Navigate to={"/admin/dashboard"} />} />

        <Route path="/admin/dashboard" element={<AdminDash />} />
        <Route path="/admin/all-restaurant" element={<AllRestaurant />} />
        <Route path="/admin/add-restaurant" element={<AddRestaurant />} />

        <Route path="/checkout/success" element={<CheckoutSuccess />} />

        {/* Payment */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFail />} />
        <Route path="/confirm-order" element={<PlaceOrder />} />

        <Route path="/product" element={<Product />} />

        <Route path="*" element={<NotFoundPage />} />
        {/* test */}
      </Routes>
    </>
  );
}

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default App;
