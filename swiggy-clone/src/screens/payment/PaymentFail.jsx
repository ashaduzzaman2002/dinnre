import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PaymentFail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const redirect = queryParams.get('redirect');

  useEffect(() => {
    if (!redirect) return navigate('/cart');
  }, []);

  if (!redirect) {
    return (
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div class="payment px-3 pt-5 d-flex align-items-center flex-column">
        <i class="bi bi-x-circle-fill pt-5 text-danger"></i>
        <h1 className="text-danger">Order Failed</h1>
        <p>
          Lorem ipsum dolor sit amet Lorem.
          <br /> Lorem ipsum dolor sit amet!
        </p>

        <Link to="/" class="boxed-btn mt-5">
          Back to Home
        </Link>
      </div>
    );
  }
};

export default PaymentFail;
