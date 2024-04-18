/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("jwt");
const config = {
  headers: {
    Authorization: `${token}`,
  },
};

const getState = ({ getStore, getActions, setStore }) => {
  // const BACKEND_URL = "http://localhost:5000";

  const API = `http://localhost:5000/api`;

  return {
    store: {
      user: [],
      userData: {},
      isAuth: false,
      test: "test store",
    },
    actions: {
      showNotification: async (message, type) => {
        setStore({ response: { message, type } });
      },
      dateFormater: (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      },
      register: async (
        firstname,
        lastname,
        phone,
        sex,
        email,
        address,
        birthday,
        password
      ) => {
        const actions = getActions();
        try {
          const response = axios.post(`${API}/register`, {
            firstname,
            lastname,
            phone,
            sex,
            email,
            address,
            birthday,
            password,
          });

          if (response) {
            console.log("User registred successfully");
            return true;
          }
        } catch (error) {
          console.error("Error registring user", error);
        }
      },
      login: async (email, password) => {
        try {
          const response = await axios.post(`${API}/login`, {
            email: email,
            password: password,
          });

          if (response.status === 201 || response.status === 200) {
            const data = response.data;
            const store = getStore();
            Cookies.set("jwt", data.token);
            console.log(data);
            const user = jwtDecode(data.token);
            console.log(user);
            setStore({ ...store, isAuth: true, user: user });
            return data;
          }
        } catch (error) {
          if (error.data) {
            return error.data.message;
          }
          console.log(error);
        }
      },
      isAuth: async () => {
        let token = Cookies.get("jwt");
        if (token) {
          try {
            const response = await axios.get(`${API}/private`, {
              headers: { Authorization: `${token}` },
            });
            if (response.status && response.status === 200) {
              const data = await response.data;
              const store = getStore();
              console.log(data);
              if (data.user) {
                setStore({ ...store, isAuth: true, user: data.user });
              }
            }
          } catch (error) {
            if (error.response) {
              return error.response.data.message;
            }
          }
        }
      },
      getUserData: async (id) => {
        try {
          const response = await axios.get(`${API}/user/${id}`);
          const data = response.data;
          const store = getStore();
          const decodedToken = jwtDecode(data.token);
          console.log(decodedToken);
          setStore({ ...store, userData: decodedToken.user });
          return true;
        } catch (error) {
          console.error("Error getting user data", error);
        }
      },
    },
  };
};

export default getState;
