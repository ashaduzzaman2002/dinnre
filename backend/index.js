const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000 || process.env.PORT;
const cloudinary = require("cloudinary");
const Razorpay = require("razorpay");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

// require router
const restaurantRouter = require("./routers/restaurant");
const user = require("./routers/user");
const adminRouter = require("./routers/admin");
const paymentRouter = require("./routers/paymentRoute.js");
const { initialize } = require("./config/socket");

// Initialize Socket.io
const io = socketIo(server);

// Listen for incoming connections
initialize(server);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://dinnre.com",
      "https://admin.dinnre.com",
      "https://restaurant.dinnre.com",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use("/restaurants", restaurantRouter);
// app.use("/user/payment", paymentRouter);
app.use("/user", user);
app.use("/admin", adminRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRECT,
});

connectDB();

server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
