import React, { useEffect, useState } from "react";
import "./Restaurant-page.css";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import { dbObject } from "../../helper/api";
import ProductCard from "../../components/product/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import {
  Spinner,
  Flex,
  Text,
  Card,
  Stack,
  Image,
  CardBody,
  Heading,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

const RestaurantPage = () => {
  const { id } = useParams();

  const [swiper, setSwiper] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [gap, setGap] = useState(30);
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 404) {
        setSlidesPerView(1);
        setGap(10);
      } else if (window.innerWidth < 560) {
        setSlidesPerView(1.35);
        setGap(10);
      } else if (window.innerWidth < 992) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1200) {
        setSlidesPerView(3);
        setGap(15);
      } else {
        setSlidesPerView(4);
      }
    };

    // Update the slidesPerView initially and add a listener for window resize events
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const fetchData = async () => {
    const { data } = await dbObject(`/restaurants/${id}`);
    console.log(data);
    return data?.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [id],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <Layout title={data?.name || "Not found"}>
      <div className="container cm">
        {!isLoading ? (
          <>
            {data ? (
              <div>
                <div>
                  <div>
                    <Card
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                    >
                      <Image
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "300px" }}
                        src={data?.profile_img}
                        alt="Caffe Latte"
                      />

                      <Stack>
                        <CardBody>
                          <Heading size="md">{data?.name}</Heading>

                          <Text py="2">{data?.about}</Text>
                          <Text py="2">{data?.location}</Text>

                          <Button variant="solid" colorScheme="purple">
                            Give Rating
                          </Button>
                        </CardBody>
                      </Stack>
                    </Card>
                  </div>
                </div>
                {/* <hr /> */}

                <Tabs mt={4}>
                  <TabList>
                    <Tab>Menu</Tab>
                    <Tab>Reviews</Tab>
                    {/* <Tab>Photos</Tab> */}
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      {data?.menu?.length ? (
                        <div>
                          {/* <Text>Our Menu</Text> */}
                          <div className="item-container">
                            {data?.menu?.map((item, i) => (
                              <ProductCard key={i} item={item} />
                            ))}
                          </div>

                          <Swiper
                            className="slider-custom"
                            onSwiper={setSwiper}
                            spaceBetween={gap}
                            slidesPerView={slidesPerView}
                          >
                            {data?.menu?.map((item, i) => (
                              <SwiperSlide key={i}>
                                <ProductCard key={i} item={item} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      ) : (
                        <div className="container d-flex align-items-center justify-content-center mt-5">
                          <div className="row" style={{ width: "100%" }}>
                            <div className="col-lg-8 offset-lg-2 text-center">
                              <div className="error-text">
                                <i class="bi bi-emoji-frown"></i>
                                <h1>No Items Availabe.</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel>
                      <p>Reviews</p>
                    </TabPanel>
                    {/* <TabPanel>
                      <p>three!</p>
                    </TabPanel> */}
                  </TabPanels>
                </Tabs>
              </div>
            ) : (
              <div className="container d-flex align-items-center justify-content-center mt-5">
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-lg-8 offset-lg-2 text-center">
                    <div className="error-text">
                      <i class="bi bi-emoji-frown"></i>
                      <h1>Oops! Restaurant Not Found.</h1>
                      <p>Seacrhn for diffrent restaurnat</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            minHeight={"400px"}
          >
            <Spinner size="lg" color="#BE2AED " />
          </Flex>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantPage;
