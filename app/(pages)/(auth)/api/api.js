// app/api.js
import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:5000/api'; // Change this to your actual API URL if it's different

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data; // Returns user data and token
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to log in as admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login_mydash`, credentials);
    return response.data; // Returns the admin token
  } catch (error) {
    console.error('Error during admin login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get all users (Admin only)
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return response.data; // Returns user list
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for further handling
  }
};

// Function to create a plan (Admin only)
export const createPlan = async (token, planData) => {
  try {
      const response = await axios.post(`${API_URL}/admin/plans`, planData, {
          headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
          },
      });
      return response.data; // Returns created plan
  } catch (error) {
      console.error('Error creating plan:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error for further handling
  }
};

// Function to get all plans (Admin only)
export const getPlans = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/plans`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return response.data; // Returns list of plans
  } catch (error) {
    console.error('Error fetching plans:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for further handling
  }
};


// Function to edit a plan (Admin only)
export const updatePlan = async (token, planId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/plans/${planId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });
    return response.data; // Returns updated plan
  } catch (error) {
    console.error('Error updating plan:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for further handling
  }
};