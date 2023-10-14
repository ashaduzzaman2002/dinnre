import React, { useContext, useEffect } from "react";
import "./cart.css";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { dbObject } from "../../helper/api";
import Layout from "../../layout/Layout";

const Cart = () => {
  const { cartItems, totalPrice } = useContext(AppContext);
  useEffect(() => {
    console.log(cartItems)
  },)

  const navigate = useNavigate();

  return (
    <Layout title="Cart">
      <div className="restaurant mt-5 pt-5">
        <div className="container mt-md-5 p-3 cart-container">
        <div className="card">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <h4>
                  <b>Shopping Cart</b>
                </h4>

                {
                  cartItems.length ? <div className="text-muted">{cartItems?.length || 0} items</div>: null
                }
                
              </div>

              <div className="row border-top">
                {cartItems?.length ? (
                  cartItems?.map((item) => (
                    <CartItem key={item._id} data={item} />
                  ))
                  // <h1>Hel</h1>
                ) : (
                  <div className="container d-flex align-items-center justify-content-center mt-5">
                    <div className="row" style={{ width: '100%' }}>
                      <div className="col-lg-8 offset-lg-2 text-center">
                        <div className="error-text">
                          <h1>Oops! No Item Found.</h1>
                          <p>Please add items to cart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="back-to-shop">
                <Link to="/">←</Link>
                <span className="text-muted">Back to shop</span>
              </div>
            </div>

            {cartItems?.length ? (
              <div className="col-md-4 summary">
                <div>
                  <h5>
                    <b>Summary</b>
                  </h5>
                </div>
                <hr />
                <div className="row">
                  <div className="col" style={{ paddingLeft: 0 }}>
                    ITEMS {cartItems?.length || 0}
                  </div>
                  <div className="col text-right">
                    ₹ {totalPrice.toFixed(2)}
                  </div>
                </div>
                <form>
                  <p>GIVE CODE</p>
                  <input id="code" placeholder="Enter your code" />
                </form>
                <div
                  className="row"
                  style={{
                    borderTop: '1px solid rgba(0,0,0,.1)',
                    padding: '2vh 0px',
                  }}
                >
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right">
                    ₹ {totalPrice.toFixed(2)}
                  </div>
                </div>
                <button onClick={() => navigate('/confirm-order', { state: { redirect: true } })} className="btn">
                  CHECKOUT
                </button>
              </div>
            ): null}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

const CartItem = ({ data }) => {
  const { removeFromCart, decreaseQuantity, increaseQuantity } =
    useContext(AppContext);
  return (
    <div className="border-bottom p-0">
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={data.img} />
        </div>
        <div className="col">
          <div className="row text-muted">
            {data.name.slice(0, 18)}
            {data?.title?.length >= 18 ? "..." : null}
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-center gap-2">
          <button
            className="cart-btn"
            onClick={() => decreaseQuantity(data._id)}
          >
            -
          </button>
          <a
            style={{ cursor: "default", userSelect: "none" }}
            className="border"
          >
            {data.quantity}
          </a>
          <button
            onClick={() => increaseQuantity(data._id)}
            className="cart-btn"
          >
            +
          </button>
        </div>
        <div className="col d-flex gap-2 align-items-center justify-content-center">
          <span>₹ {(data?.price * data?.quantity).toFixed(0)}</span>
          <button
            onClick={() => removeFromCart(data._id)}
            className="close text-danger"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
