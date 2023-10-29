import * as Yup from "yup";

// otp validation
export const otpSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});


// otp validation
export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// create profile validation
export const createProfileSchema = Yup.object({
  name: Yup.string().required("Restaurant Name is required"),
  location: Yup.string().required("Location is required"),
  city: Yup.string().required("City is required"),
  about: Yup.string().required("Description is required"),
});

// bank validation
export const bankSchema = Yup.object({
  bankName: Yup.string().required("Bank Name is required"),
  accountHolder: Yup.string().required("Account Holder is required"),
  accountNo: Yup.string().required("Account Number is required"),
  upi: Yup.string().required("UPI is required"),
  ifsc: Yup.string().required("IFSC code is required"),
});
