import React, { useContext, useEffect } from "react";
import "./payment.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { clearCart } = useContext(AppContext);

  const paymentId = queryParams.get("paymentId");
  const otp = queryParams.get("otp");

  useEffect(() => {
    if ((!paymentId, !otp)) {
      return navigate("/cart");
    }
    clearCart();
  }, [paymentId, otp]);

  if ((!paymentId, !otp)) {
    return (
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div class="payment px-3 pt-5 d-flex align-items-center flex-column">
        <i class="bi bi-check-circle-fill pt-5"></i>
        <h1>Success</h1>
        <p>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>

        <p className="mt-3">Payment id: {paymentId}</p>
        <p>Refference number</p>
        <span>{otp}</span>

        <small className="font-2xl">Please Take a screen short</small>
        <Link to="/" class="boxed-btn mt-5">
          Back to Home
        </Link>
      </div>
    );
  }
};

export default PaymentSuccess;
