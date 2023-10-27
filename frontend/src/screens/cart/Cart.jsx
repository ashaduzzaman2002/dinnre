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

// const CartItem = ({ data }) => {
//   const { removeFromCart, decreaseQuantity, increaseQuantity } =
//     useContext(AppContext);
//   return (
//     <div className="border-bottom p-0">
//       <div className="row main align-items-center">
//         <div className="col-2">
//           <img className="img-fluid" src={data.img} />
//         </div>
//         <div className="col">
//           <div className="row text-muted">
//             {data.name.slice(0, 18)}
//             {data?.title?.length >= 18 ? "..." : null}
//           </div>
//         </div>
//         <div className="col d-flex align-items-center justify-content-center gap-2">
//           <button
//             className="cart-btn"
//             onClick={() => decreaseQuantity(data._id)}
//           >
//             -
//           </button>
//           <a
//             style={{ cursor: "default", userSelect: "none" }}
//             className="border"
//           >
//             {data.quantity}
//           </a>
//           <button
//             onClick={() => increaseQuantity(data._id)}
//             className="cart-btn"
//           >
//             +
//           </button>
//         </div>
//         <div className="col d-flex gap-2 align-items-center justify-content-center">
//           <span>₹ {(data?.price * data?.quantity).toFixed(0)}</span>
//           <button
//             onClick={() => removeFromCart(data._id)}
//             className="close text-danger"
//           >
//             <i className="bi bi-trash3"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


const CartItem = ({data}) => {


  return (
    <div className="d-flex justify-content-between align-items-center border  my-1 p-2 rounded ">
      
      <div className="d-flex justify-content-center align-items-center gap-2">
        <img 
          src={data?.img}
          alt="logo" 
          className="img-thumbnail"
          style={{ aspectRatio: "1 / 1", width: "4.5rem", borderRadius: "1rem"}}
        />
        <p className="mb-0">{"eiurfiewr iewf veif eiufe"}</p>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-4"
      >
        <div className="rounded-pill d-flex p-1 justify-content-center align-items-center"
          style={{background: "rgb(219, 230, 230, 0.5)", height: '2rem'}}
        >
          <button className="rounded-circle border fw-bolder" style={{background: 'white'}}>-</button>
          <span className="mx-2">{"21"}</span>
          <button className="rounded-circle border fw-bolder" style={{background: 'white'}}>+</button>
        </div>

        <div className="fw-bolder">$ {"260"}</div>

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" fill="white"/>
            <path d="M24.5819 6.10134C22.7036 5.91467 20.8253 5.77467 18.9353 5.66967V5.65801L18.6786 4.14134C18.5036 3.06801 18.2469 1.45801 15.5169 1.45801H12.4603C9.74193 1.45801 9.48527 2.99801 9.2986 4.12967L9.0536 5.62301C7.9686 5.69301 6.8836 5.76301 5.7986 5.86801L3.4186 6.10134C2.9286 6.14801 2.5786 6.57967 2.62527 7.05801C2.67193 7.53634 3.09193 7.88634 3.58193 7.83967L5.96193 7.60634C12.0753 6.99967 18.2353 7.23301 24.4186 7.85134H24.5119C24.9553 7.85134 25.3403 7.51301 25.3869 7.05801C25.4045 6.82495 25.3301 6.59429 25.1796 6.41546C25.0291 6.23663 24.8146 6.12387 24.5819 6.10134ZM22.4353 9.49634C22.1553 9.20467 21.7703 9.04134 21.3736 9.04134H6.62693C6.23027 9.04134 5.8336 9.20467 5.56527 9.49634C5.29693 9.78801 5.14527 10.1847 5.1686 10.593L5.89193 22.563C6.02027 24.3363 6.1836 26.553 10.2553 26.553H17.7453C21.8169 26.553 21.9803 24.348 22.1086 22.563L22.8319 10.6047C22.8553 10.1847 22.7036 9.78801 22.4353 9.49634ZM15.9369 20.708H12.0519C11.5736 20.708 11.1769 20.3113 11.1769 19.833C11.1769 19.3547 11.5736 18.958 12.0519 18.958H15.9369C16.4153 18.958 16.8119 19.3547 16.8119 19.833C16.8119 20.3113 16.4153 20.708 15.9369 20.708ZM16.9169 16.0413H11.0836C10.6053 16.0413 10.2086 15.6447 10.2086 15.1663C10.2086 14.688 10.6053 14.2913 11.0836 14.2913H16.9169C17.3953 14.2913 17.7919 14.688 17.7919 15.1663C17.7919 15.6447 17.3953 16.0413 16.9169 16.0413Z" fill="#FF0000"/>
          </svg>
        </div>
      </div>

    </div>
  )
}

export default Cart;
