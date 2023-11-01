import React, { useContext } from "react";
import Layout from "../../layout/Layout";
import Protected from "../../routes/Protected";
import { Box, Text } from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";

const Profile = () => {
  const { profile } = useContext(AppContext);
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
                          src={profile?.profile_img || "/images/no-image.jpg"}
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
                        <h5>{profile?.name}</h5>
                        <p>{profile?.email}</p>
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
                            {profile?.about}
                          </p>
                        </div>
                      </div>

                      <div class="mb-5">
                        <p class="lead fw-normal mb-1">Location</p>
                        <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <p class="font-italic mb-1">{profile?.city}</p>
                          <p class="font-italic mb-1">{profile?.location}</p>
                          {/* <p class="font-italic mb-0">West Bengal</p> */}
                        </div>
                      </div>

                      <div class="mb-5">
                        <p class="lead fw-normal mb-1">Bank Details</p>
                        <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="lg">
                                  Bank
                                </Text>
                                <Text fontSize="md">{profile?.bankName}</Text>
                              </Box>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="lg">
                                  Account Number
                                </Text>
                                <Text fontSize="md">{profile.accountNo}</Text>
                              </Box>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="lg">
                                  Account Holder
                                </Text>
                                <Text fontSize="md">
                                  {profile.accountHolder}
                                </Text>
                              </Box>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="lg">
                                  IFSC Code
                                </Text>
                                <Text fontSize="md">{profile.ifsc}</Text>
                              </Box>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                              <Box maxW="32rem">
                                <Text mb={0} fontWeight={"600"} fontSize="lg">
                                  UPI Id
                                </Text>
                                <Text mb={0} fontSize="md">
                                  {profile.upi}
                                </Text>
                              </Box>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <p class="lead fw-normal mb-0">Popular Items</p>
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
