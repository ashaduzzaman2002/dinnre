import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { baseURL, dbObject } from '../../helper/api';
import { useFormik } from 'formik';
import { orderSchema } from '../../validation/fromValidation';

const initialValues = {
  name: '',
  number: '',
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { cartItems, totalPrice } = useContext(AppContext);
  const location = useLocation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: orderSchema,

      onSubmit: async () => {
        try {
          setLoading(true)
          const {
            data: { key },
          } = await dbObject('/api/getkey');
          const { data } = await dbObject.post('/payment/checkout', {
            amount: totalPrice || 0,
          });

          setLoading(false)

          var options = {
            key: key,
            amount: data.order.amount,
            currency: 'INR',
            name: 'Acme Corp',
            description: 'Test Transaction',
            image: 'https://example.com/your_logo',
            order_id: data.order.id,
            callback_url: `${baseURL}/payment/verification?name=ashadu&number=903480565&cartitems=${JSON.stringify(cartItems)}`,
            prefill: {
              name: 'Gaurav Kumar',
              email: 'gaurav.kumar@example.com',
              contact: '9000090000',
            },
            notes: {
              address: 'Razorpay Corporate Office',
            },
            theme: {
              color: '#3399cc',
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
        } catch (error) {
          console.log(error);
        }
      },
    });

  useEffect(() => {
    if (!location?.state && !location?.state?.redirect) {
      return navigate('/cart');
    }
  }, []);

  if (!location?.state && !location?.state?.redirect) {
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
      <div class="container pt-5">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5
            class="section-title ff-secondary text-center fw-normal"
            style={{ color: 'rgb(254, 161, 22)' }}
          >
            Order
          </h5>
          <h1
            class="mb-5"
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: '800',
              lineHeight: '1.2',
              color: '#0F172B',
            }}
          >
            Confirm Your Order
          </h1>
        </div>
        <div class="col-md-6 col-12 m-auto">
          <div class="wow fadeInUp" data-wow-delay="0.2s">
            <form onSubmit={handleSubmit}>
              <div class="row">
                <div class="col-12 mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />
                    <label for="name">Your Name</label>
                  </div>

                  {errors.name && touched.name ? (
                    <small style={{ color: 'red' }}>{errors.name}</small>
                  ) : null}
                </div>

                <div class="col-12 mb-3">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control"
                      id="number"
                      placeholder="Phone Number"
                      name="number"
                      value={values.number}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label for="number">Phone Number</label>
                  </div>

                  {errors.number && touched.number ? (
                    <small style={{ color: 'red' }}>{errors.number}</small>
                  ) : null}
                </div>
                <div class="col-12">
                  <button
                  disabled={loading}
                    class="btn btn-primary w-100 py-3 d-flex justify-content-center align-items-center"
                    type="submit"
                    style={{cursor: loading? 'progress':'default'}}
                  >
                    {' '}
                    {!loading ? (
                      'Confirm'
                    ) : (
                      <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default PlaceOrder;
