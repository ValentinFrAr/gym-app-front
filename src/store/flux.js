import axios from "axios";
import Cookies from "js-cookie";

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
    },
  };
};

export default getState;
