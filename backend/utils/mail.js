const nodemailer = require("nodemailer");

// OTP generator
exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const randVal = Math.floor(Math.random() * 10);
    otp = otp + randVal;
  }
  return otp;
};

// Send mail function
exports.mailTransport = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "crezytechy@gmail.com",
      pass: "vvmyhpfkiyxgakld",
    },
    port: 465,
    host: "smtp.gamil.com",
  });

exports.mailTemplete = (otp) => {
  return `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Dinnre</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Your authentication OTP is bellow. OTP is valid for 10 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Dinnre</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Surat</p>
        <p>Gujrat</p>
        <p>India</p>
      </div>
    </div>
  </div>`;
};
