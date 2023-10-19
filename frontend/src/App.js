import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/home/Home";
import Search from "./screens/search/Search";
import Restaurants from "./screens/menu/Restaurants";
import NotFoundPage from "./screens/404page/404Page";
import Menu from "./screens/menu/Menu";
import Welcome from "./screens/welcome/Welcome";
import Cart from "./screens/cart/Cart";
import Item from "./screens/menu/Item";
import CheckoutSuccess from "./screens/checkout/CheckoutSuccess";
import PaymentSuccess from "./screens/payment/PaymentSuccess";
import PaymentFail from "./screens/payment/PaymentFail";
import PlaceOrder from "./screens/order/PlaceOrder";
import Product from "./screens/product/Product";
import AllProduct from "./screens/all-product/AllProduct";
import AllRestaurant from "./screens/all-restaurant/AllRestaurant";
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
        <Route path="/confirm-order" element={<PlaceOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
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
