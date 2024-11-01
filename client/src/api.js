import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
};

// Post data to API
export const postData = async (url, formData) => {
  try {
    const response = await axiosInstance.post(url, formData);
    return { success: true, data: response.data }; 
  } catch (error) {
    console.error("Error in postData:", error);

  
    if (error.response) {
      return { success: false, message: error.response.data.msg || error.message, status: error.response.status };
    }

 
    return { success: false, message: "An unexpected error occurred." };
  }};

export const editData = async (url, updateData) => {
  try {
    const { data } = await axiosInstance.put(url, updateData);
    return data;
  } catch (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axiosInstance.delete(url);
     return { success: true }; 
  } catch (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
};


export const deleteImages = async (url) => {
  try {
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
};


export const sendOtp = async (url, email) => {
  try {
    const response = await axiosInstance.post(url, { email });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
};


export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (otpData) => {
  try {
    const response = await axiosInstance.post("/user/verifyOtp", otpData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
