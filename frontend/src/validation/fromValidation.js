import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const orderSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  number: Yup.number().required('Phone number is required'),
});
