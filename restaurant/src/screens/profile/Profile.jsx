import React from "react";
import Layout from "../../layout/Layout";
import Protected from "../../routes/Protected";
import { Box, Heading, Text } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Protected>
      <Layout title={"Profile"}>
        <div className="dashboard_container container cm">
          <section class="h-100">
            <div class="h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-lg-9 col-xl-7">
                  <div class="card">
                    <div
                      class="rounded-top text-white d-flex flex-row"
                      style={{
                        height: 200,
                        background:
                          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/cover.png')",
                        backgroundSize: "cover",
                      }}
                    >
                      <div
                        class="ms-4 mt-5 d-flex flex-column"
                        style={{ width: 150, height: 220 }}
                      >
                        <img
                          src="https://imgmedia.lbb.in/media/2023/01/63d37aa371710d3f45ec1fa8_1674803875414.jpg"
                          alt="Profile image"
                          class="img-fluid img-thumbnail mt-4 mb-2 object-fit-cover"
                          style={{ width: 150, zIndex: 1, height: 200 }}
                        />
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          data-mdb-ripple-color="dark"
                          style={{ zIndex: 1 }}
                        >
                          Edit profile
                        </button>
                      </div>
                      <div class="ms-3" style={{ marginTop: 130 }}>
                        <h5>Shimla Biriyani</h5>
                        <p>restaurant@gmail.com</p>
                      </div>
                    </div>
                    <div
                      class="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div class="d-flex justify-content-end text-center py-1">
                        <div>
                          <p class="mb-1 h5">Status</p>
                          <p class="small  mb-0" style={{ color: "#6EC531" }}>
                            Active
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="card-body p-4 text-black">
                      <div class="mb-5">
                        <p class="lead fw-normal mb-1">About</p>
                        <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <p
                            class="font-italic mb-1"
                            style={{ fontStyle: "italic" }}
                          >
                            {" "}
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Cum totam magni consequatur ad? Ea officia
                            numquam eius? Repellat, earum fugiat?
                          </p>
                        </div>
                      </div>

                      <div class="mb-5">
                        <p class="lead fw-normal mb-1">Location</p>
                        <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <p class="font-italic mb-1">Chinnar Park,</p>
                          <p class="font-italic mb-1">Kolkata,</p>
                          <p class="font-italic mb-0">West Bengal</p>
                        </div>
                      </div>

                      <div class="mb-5">
                        <p class="lead fw-normal mb-1">Bank Details</p>
                        <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="3xl">
                                  Bank
                                </Text>
                                <Text fontSize="md">Punjab National Bank</Text>
                              </Box>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="3xl">
                                  Account Number
                                </Text>
                                <Text fontSize="md">504562325281</Text>
                              </Box>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="3xl">
                                  Account Holder
                                </Text>
                                <Text fontSize="md">Shimla Biriyani</Text>
                              </Box>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="3xl">
                                  IFSC Code
                                </Text>
                                <Text fontSize="md">PUNB78062</Text>
                              </Box>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="3xl">
                                  UPI Id
                                </Text>
                                <Text mb={0} fontSize="md">
                                  test@ybl
                                </Text>
                              </Box>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <p class="lead fw-normal mb-0">Recent photos</p>
                        <p class="mb-0">
                          <a href="#!" class="text-muted">
                            Show all
                          </a>
                        </p>
                      </div>
                      <div class="row g-2">
                        <div class="col mb-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                            alt="image 1"
                            class="w-100 rounded-3"
                          />
                        </div>
                        <div class="col mb-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                            alt="image 1"
                            class="w-100 rounded-3"
                          />
                        </div>
                      </div>
                      <div class="row g-2">
                        <div class="col">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                            alt="image 1"
                            class="w-100 rounded-3"
                          />
                        </div>
                        <div class="col">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                            alt="image 1"
                            class="w-100 rounded-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </Protected>
  );
};

export default Profile;
