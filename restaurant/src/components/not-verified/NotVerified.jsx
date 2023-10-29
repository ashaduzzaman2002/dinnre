import React from "react";
import "./not-verify.css";
import { Grid, GridItem } from "@chakra-ui/react";

const NotVerified = () => {
  return (
    <div className="dashboard_container container cm">
      <div
        class="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <div class="row" style={{ width: "100%" }}>
          <div class="col-lg-8 offset-lg-2 text-center">
            <div class="error-text">
              <i style={{ fontSize: 50 }} class="bi bi-emoji-frown"></i>
              <h1>Sorry! You are not verified.</h1>
              <p>Kindly connact to admin for verification.</p>
             

              <div className="app__footer-cards ">
                <div className="app__footer-card ">
                  <img
                    src="/images/email.37b9e890eea501421fbf.png"
                    alt="email"
                  />
                  <a href="mailto:ashaduzzaman@gmail.com" class="p-text">
                    ashaduzzaman@gmail.com
                  </a>
                </div>

                <div
                  className="app__footer-card "
                  style={{ backgroundColor: "#f2f7fb" }}
                >
                  <img
                    src="/images/mobile.145d9ce0157a56f8fcd8.png"
                    alt="email"
                  />
                  <a href="tel:+919093482056" class="p-text">
                    +91 9093482056
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
