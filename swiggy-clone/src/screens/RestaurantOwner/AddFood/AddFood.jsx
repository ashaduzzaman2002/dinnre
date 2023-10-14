import React, { useState } from "react";
import "./addFood.css";
import { dbObject } from "../../../helper/api";
import { Close, Upload } from "../../../assets/svg/SVG";

const AddFood = ({ setShowModal, setFoods, foods }) => {
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    file: "",
    price: "",
    type: "",
    category: "",
  });

  const [image, setImage] = useState();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const fileUpload = (e) => {
    setInputs({ ...inputs, file: e.target.files[0] });
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const formatData = new FormData();
      formatData.append("file", inputs.file, inputs.file.name);
      formatData.append("name", inputs.name);
      formatData.append("desc", inputs.desc);
      formatData.append("price", inputs.price);
      formatData.append("type", inputs.type);
      formatData.append("category", inputs.category);

      const { data } = await dbObject.post(
        "/restaurants/restaurant/add/food",
        formatData
      );
      console.log(data);

      if (data.success) {
        setInputs({
          name: "",
          desc: "",
          file: "",
          price: "",
          type: "",
          category: "",
        });

        setFoods([...foods, data.food]);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <RestaurantRoute>
    <div className="add-food">
      <div class="add-food-container p-3">
        <div className="d-flex align-items-center justify-content-between w-100 add-food-header">
          <h4 className="mb-0">Add Item</h4>
          <div onClick={() => setShowModal(false)}>
            <Close />
          </div>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="add-food-image mt-2">
            <div
              className="card border p-2"
              style={{ aspectRatio: "1/1", borderRadius: "5px" }}
            >
              <div className="h-100 p-0">
                <img
                  className="w-100 h-100 object-fit-cover m-0"
                  style={{ borderRadius: 15 }}
                  src={
                    image ? URL.createObjectURL(image) : "/images/no-image.jpg"
                  }
                  alt="no-image"
                />
              </div>
            </div>

            <div className="file-upload d-flex align-items-center justify-content-center position-relative">
              <input onChange={fileUpload} type="file" id="img" name="file" />

              <div className="d-flex flex-column align-items-center  gap-2">
                <Upload />
                <p className="mb-0">Drag & Drop and Choose Item to upload</p>
              </div>
            </div>
          </div>

          <div className="mt-3 form-group">
            <label htmlFor="">Title</label>
            <div>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="mt-3 form-group" style={{ width: "49%" }}>
              <label htmlFor="">Type</label>
              <div className="mt-1">
                <select
                  onChange={handleChange}
                  className="form-select"
                  id="type"
                  name="type"
                >
                  <option value="" disabled selected>
                    Select a type
                  </option>
                  <option value="non-veg">Non Veg</option>
                  <option value="veg">Veg</option>
                </select>
              </div>
            </div>

            <div className="mt-3 form-group" style={{ width: "49%" }}>
              <label htmlFor="">Category</label>
              <div>
                <select
                  onChange={handleChange}
                  className="form-select mt-1"
                  id="category"
                  name="category"
                >
                  <option value="" disabled selected>
                    Select a type
                  </option>
                  <option value="breakfast">Breakfast</option>
                  <option value="launch">Launch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="mt-3 form-group w-100">
              <label htmlFor="">Price</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 form-group">
            <label htmlFor="">Description</label>
            <div>
              <textarea
                className="form-control"
                id="desc"
                placeholder="Image"
                name="desc"
                style={{ height: "80px", resize: "none" }}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn w-75" type="submit">
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
    // </RestaurantRoute>
  );
};

export default AddFood;
