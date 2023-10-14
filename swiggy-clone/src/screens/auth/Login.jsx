import React, { useContext } from 'react';
import './login.css';
import { useFormik } from 'formik';
import { loginSchema } from '../../validation/fromValidation';
import Toastify, { tostOptions } from '../../components/Toastify/Toastify';
import { AppContext } from '../../context/AppContext';
import { dbObject } from '../../helper/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};
const Login = () => {
  const { setUser, setIsLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,

      onSubmit: async () => {
        console.log(values);
        try {
          const { data } = await dbObject.post('/auth/login', values);
          console.log(data);
          toast.success(data?.msg, tostOptions);

          setTimeout(() => {
            setUser(data?.user);
            setIsLogin(true);
            navigate('/');
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <section className="restaurants">
      <Toastify />
      <div className="container">
        <div
          className="text-center wow fadeInUp"
          data-wow-delay="0.1s"
          style={{
            visibility: 'visible',
            animationDelay: '0.1s',
            animationName: 'fadeInUp',
          }}
        >
          <h5
            className="section-title ff-secondary text-center fw-normal"
            style={{ color: '#FEA116' }}
          >
            Sign In
          </h5>
          <h1
            className="mb-5"
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: '800',
              lineHeight: '1.2',
              color: '#0F172B',
            }}
          >
            Please Sign In
          </h1>
        </div>

        <div className="col-md-6 col-12 m-auto">
          <div
            className="wow fadeInUp"
            data-wow-delay="0.2s"
            style={{
              visibility: 'visible',
              animationSelay: '0.2s',
              animationName: 'fadeInUp',
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  {errors.email && touched.email ? (
                    <small style={{ color: 'red' }}>{errors.email}</small>
                  ) : null}
                </div>
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="subject"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label htmlFor="subject">Password</label>
                  </div>
                  {errors.password && touched.password ? (
                    <small style={{ color: 'red' }}>{errors.password}</small>
                  ) : null}
                </div>

                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
