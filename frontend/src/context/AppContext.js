import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { baseURL, dbObject } from "../helper/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    calculateTotalPrice();
  }, [cartItems]);

  
  const addToCart = async (item, quantity) => {
    // Retrieve existing cart items from localStorage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (
      existingCartItems.length &&
      existingCartItems[0]?.restaurant !== item.restaurant
    ) {
      await localStorage.removeItem("cart");
      setCartItems([]);

      const updatedCartItems = [{ ...item, quantity: quantity }];

      // Update cart state and localStorage
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      // Check if the item is already in the cart
      const existingItem = existingCartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        // If the item exists in the cart, update its quantity
        const updatedCartItems = existingCartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return { ...cartItem, quantity: cartItem.quantity + quantity };
          }
          return cartItem;
        });

        // Update cart state and localStorage
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      } else {
        // If the item is not in the cart, add it with the specified quantity
        const updatedCartItems = [
          ...existingCartItems,
          { ...item, quantity: quantity },
        ];

        // Update cart state and localStorage
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      }
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const getQuantity = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    return item ? item.quantity : 0;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }

    setTotalPrice(totalPrice);
  };

  const getCities = async () => {
    try {
      setLoading(true);
      const { data } = await axios(`${baseURL}/restaurants/cities`);
      if (data.success) {
        setCities(data.cities);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectCity = (city) => {
    console.log(city);
    try {
      localStorage.setItem("city", city);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async () => {
    const myCity = localStorage.getItem("city");
    setCity(myCity);
  };



  


  // get menu
  const getItems = async () => {
    try {
      const { data } = await dbObject("/menu");
      setItems(data.items);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get restaurants
  const getRestaurant = async () => {
    try {
      const { data } = await dbObject("/restaurants");

      console.log(data);
      if (data.success) {
        setRestaurants(data?.restaurants);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
    getCity();
    getItems();
    getRestaurant();
  }, [city]);

  return (
    <AppContext.Provider
      value={{
        cities,
        selectCity,
        city,
        setCity,
        restaurants,
        setRestaurants,
        setIsLogin,
        isLogin,
        loading,
        setLoading,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
        items,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
