import axios from "axios";
// import config from "../config"; // Ensure the correct path
import config from "../config";
const API_BASE_URL = `${config.BASE_URL}/BookingUsers`;

const ApiServices = {
  createCustomer: (regFormData, token) => {
    return axios.post(`${API_BASE_URL}/createCustomer`, regFormData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // If token is required
      },
    });
  },

  verifyOTP: (mobile, otp) => {
    return axios.post(`${API_BASE_URL}/login/verify_otp`, { mobile, otp }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  },

  sendOTP: (mobile, email, countryCode) => {
    return axios.post(`${API_BASE_URL}/request_otp`, { mobile, email, countryCode }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  },


  getAllCities: (cityName) => {
    return axios.get(`${API_BASE_URL}/getAllCities?city_name=${cityName}`);
  },

};

export default ApiServices;
