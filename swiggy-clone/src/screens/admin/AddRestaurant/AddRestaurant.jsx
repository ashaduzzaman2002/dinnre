import React, { useState } from 'react';
import AdminRoute from '../../../routes/AdminRoute';
import { dbObject } from '../../../helper/api';

const AddRestaurant = () => {
  const [inputs, setInputs] = useState({
    cityName: '',
    name: '',
    location: '',
    profile_img: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const { data } = await dbObject.post(
        '/restaurants/restaurant/add/food',
        inputs
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminRoute>
      <div className="restaurant-dash">
        <div
          className="container"
          style={{ paddingTop: '6rem', paddingBottom: '5rem' }}
        >
          <div class="container-fluid">
            <div className="col-md-6 col-12 m-auto">
              <h1 class="h3 mb-2 text-gray-800">Add Restaurant</h1>
              <p class="mb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Provident, necessitatibus?.
              </p>
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
                          id="username"
                          placeholder="User Name"
                          name="username"
                          onChange={handleChange}
                        />
                        <label htmlFor="username">User Name</label>
                      </div>
                    </div>

                  <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          name="email"
                          onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>

                  <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="cityName"
                          placeholder="Enter City"
                          name="cityName"
                          onChange={handleChange}
                        />
                        <label htmlFor="cityName">Enter City</label>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Restaurant Name"
                          name="name"
                          onChange={handleChange}
                        />
                        <label htmlFor="name">Restaurant Name</label>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          placeholder="Location"
                          name="location"
                          onChange={handleChange}
                        />
                        <label htmlFor="location">Location</label>
                      </div>
                    </div>


                    <div className="col-12 mb-5">
                      <div className="form-floating">
                        <input
                          onChange={handleChange}
                          type="file"
                          className="form-control"
                          id="profile_img"
                          placeholder="Profile Image"
                          name="profile_img"
                        />
                        <label htmlFor="profile_img">Profile Image</label>
                      </div>
                    </div>

                    <div className="col-12 mt-5">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Add Restaurant
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default AddRestaurant;
