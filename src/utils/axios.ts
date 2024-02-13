// imports
import axios from "axios";

// base url
const clientBaseURL = import.meta.env.VITE_APP_BASE_URL;
const adminBaseURL = import.meta.env.VITE_APP_ADMIN_BASE_URL;

// client
export const client = axios.create({
  baseURL: clientBaseURL,
  headers: {
    Accept: "application/json",
  },
});

// admin base url
export const admin = axios.create({
  baseURL: adminBaseURL,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use((request: any) => {
  // access token
  const access_token = localStorage.getItem("access_token");

  // clear headers from request
  if (!request.headers) {
    request.headers = {};
  }

  return request;
});

// check to origin
client.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response.status === 401) {
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error);
  }
);

admin.interceptors.request.use((request: any) => {
  // access token
  const access_token = localStorage.getItem("access_token");

  // clear headers from request
  if (!request.headers) {
    request.headers = {};
  }

  // set token
  if (access_token) {
    request.headers.Authorization = `Bearer ${access_token}`;
  }

  return request;
});

// check to origin
admin.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response.status === 401) {
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error);
  }
);
