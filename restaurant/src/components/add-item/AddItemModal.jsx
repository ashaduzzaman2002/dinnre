import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Add, Upload } from "../../assets/svg/SVG";
import { useMutation } from "@tanstack/react-query";
import { dbObject } from "../../helper/api";

const AddItemModal = ({ isOpen, onClose, queryClient, page, search }) => {
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    file: "",
    price: "",
    type: "",
    category: "",
  });

  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const fileUpload = (e) => {
    setInputs({ ...inputs, file: e.target.files[0] });
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      console.log(inputs);
      if (
        !inputs.file ||
        !inputs.name ||
        !inputs.desc ||
        !inputs.price ||
        !inputs.price ||
        !inputs.type ||
        !inputs?.category?.length
      )
        return toast({
          title: "All feilds are required",
          status: "error",
          duration: 1000,
          position: "top",
          isClosable: true,
        });

      setLoading(true);
      const formatData = new FormData();
      formatData.append("file", inputs.file, inputs.file.name);
      formatData.append("name", inputs.name);
      formatData.append("desc", inputs.desc);
      formatData.append("price", inputs.price);
      formatData.append("type", inputs.type);
      formatData.append("category", inputs.category);

      const { data } = await dbObject.post("/add/food", formatData);
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
        queryClient.invalidateQueries(["pendingRestaurants", page, search]);
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.msg,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
    }

    onClose();
    setLoading(false);
  };

  return (
    <Modal size={"lg"} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form action="">
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
                      image
                        ? URL.createObjectURL(image)
                        : "/images/no-image.jpg"
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
              <div className="mt-1">
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
                    defaultValue={""}
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
                <div className="mt-1">
                  <select
                    onChange={handleChange}
                    className="form-select mt-1"
                    id="category"
                    name="category"
                    defaultValue={""}
                  >
                    <option value="" disabled selected>
                      Select a Category
                    </option>
                    <option value="all-time">All Time</option>
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
                <div className="mt-1">
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 form-group">
              <label htmlFor="">Description</label>
              <div className="mt-1">
                <textarea
                  className="form-control"
                  id="desc"
                  name="desc"
                  style={{ height: "80px", resize: "none" }}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Flex w={"100%"} justifyContent={"center"}>
            <Button
              w={"250px"}
              onClick={handleSubmit}
              bg={"#FF5249"}
              colorScheme="orange"
              gap={2}
              isLoading={loading}
              loadingText="Adding..."
            >
              <Add />
              Add Item
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;
