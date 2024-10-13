import axios from "axios";

// const user = JSON.parse(localStorage.getItem("user"));
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// const isTokenExpired = (token) => {
//   if (!token) {
//     return true;
//   }

//   const payload = jwtDecode(token);
//   if (!payload || !payload.exp) {
//     return true;
//   }

//   const currentTimestamp = Math.floor(Date.now() / 1000);

//   return payload.exp < currentTimestamp;
// };

// api.interceptors.request.use((config) => {
//   const expired = isTokenExpired(token);
//   const endpoint = config.url.includes("auth");
//   if (expired && !endpoint) {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }
//   return config;
// });

//not compulsory but nice to have
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message ===
          "Full authentication is required to access this resource"
      ) {
        // console.log(error.response);
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    /** Handle errors **/
    return Promise.reject(error);
  }
);

export default api;
