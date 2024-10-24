import axios from "axios";

// Fetch data from API
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};


// Post data to API
export const postData = async (url, formData) => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_BASE_URL + url,
      formData
    );
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Edit data via PUT request
export const editData = async (url, updateData) => {
  try {
    const { data } = await axios.put(
      process.env.REACT_APP_BASE_URL + url,
      updateData
    );
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Delete data via DELETE request
export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}${url}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Delete images
export const deleteImages = async (url) => {
  try {
    const { data } = await axios.delete(process.env.REACT_APP_BASE_URL + url);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
