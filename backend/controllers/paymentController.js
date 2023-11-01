const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const { getIo } = require("../config/socket");
const Food = require("../models/Food");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRECT,
});

exports.checkout = async (req, res) => {
  const { items } = req.body;

  try {
    const itemIds = items.map((item) => item._id);

    const foodItems = await Food.find({ _id: { $in: itemIds } });

    let totalPrice = 0;
    foodItems.forEach((foodItem) => {
      const orderItem = items.find(
        (item) => item._id.toString() === foodItem._id.toString()
      );
      if (orderItem) {
        totalPrice += parseInt(foodItem.price) * orderItem.quantity;
      }
    });

    // return console.log(totalPrice);

    // return console.log(items)
    var options = {
      amount: Number(totalPrice) * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    // return console.log(options, process.env.RAZORPAY_API_KEY, process.env.RAZORPAY_API_SECRECT, instance)

    instance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "An error occurred while creating the order" });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ sucess: false, msg: "Internal Server error" });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_signature, razorpay_payment_id } =
      req.body;

    const { name, number, items } = req.query;

    console.log(name, number, items);

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRECT)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const otp = Math.floor(Math.random() * 9000) + 1000;

      // const restaurantId = await
      // const newOrder = new Order({
      //   customerName: name,
      //   customerNumber: number,
      //   items: []
      // });
      // await newOrder.save();
      // const io = getIo();
      // io.emit("newOrder", newOrder);
      // res.json({ success: true, order: newOrder });
      res.redirect(
        `http://localhost:3000/payment/success?paymentId=${razorpay_payment_id}&otp=${otp}`
      );
    } else {
      res.redirect(`http://localhost:3000/payment/failed?redirect=true`);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ sucess: false, msg: "Internal Server error" });
  }
};
