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
      users: [],
      userData: {},
      isAuth: false,
      plan: [],
    },
    actions: {
      showNotification: async (message, type) => {
        setStore({ response: { message, type } });
      },
      dateFormater: (date) => {
        return new Date(date).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      },

      /*************************************
        
            AUTH FUNCTIONS

     ***************************************/

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
          const response = await axios.get(`${API}/user/${id}`, config);
          const data = response.data;
          const store = getStore();
          const decodedToken = jwtDecode(data.token);
          setStore({ ...store, userData: decodedToken.user });
          return decodedToken.user;
        } catch (error) {
          console.error("Error getting user data", error);
        }
      },
      getAllUsers: async () => {
        try {
          const response = await axios.get(`${API}/users`, config);
          const data = response.data;
          const store = getStore();
          const decodedToken = jwtDecode(data.codedData);
          setStore({ ...store, users: decodedToken.users });
        } catch (error) {
          console.error("Error getting users", error);
        }
      },
      updateUserData: async (email, phone, address, is_admin, password, id) => {
        const actions = getActions();
        try {
          const req = await axios.put(
            `${API}/update/${id}`,
            {
              email,
              phone,
              address,
              is_admin,
              password,
              id,
            },
            config
          );
          actions.showNotification("Modificacion exitosa", "success");
          return req;
        } catch (error) {
          actions.showNotification(
            "Error al modificar datos, comprueba la informacion",
            "danger"
          );
        }
      },
      deleteUser: async (userId) => {
        try {
          const response = await axios.delete(
            `${API}/delete/${userId}`,
            config
          );
          console.log(response);
          if (response.status === 200) {
            setStore((prevStore) => {
              const updatedUsers = prevStore.users.filter(
                (user) => user.id !== userId
              );
              // actions.showNotification("User deleted successfully", "success");
              console.log("deleted FROM FLUX");
              return { ...prevStore, users: updatedUsers };
            });
          }
        } catch (error) {
          console.error("Error deleting user", error);
        }
      },

      /**************************
     
      PROGRAMS FUNCTIONS

       *************************/

      createProgram: async (
        name,
        description,
        weekly_routine,
        duration_program,
        userId
      ) => {
        const actions = getActions();
        try {
          const response = await axios.post(
            `${API}/create-program/${userId}`,
            {
              name,
              description,
              weekly_routine,
              duration_program,
              userId,
            },
            config
          );
          return response.data;
        } catch (error) {
          console.error("Error creating program:", error);
          throw error;
        }
      },
      modificateProgram: async (
        id,
        name,
        description,
        weekly_routine,
        duration_program
      ) => {
        try {
          const response = axios.put(
            `${API}/modificate-program/${id}`,
            { name, description, weekly_routine, duration_program },
            config
          );
          return response.data;
        } catch (error) {
          console.error("Error updating program:", error);
          throw error;
        }
      },
      deleteProgram: async (id) => {
        try {
          const response = axios.delete(`${API}/delete-program/${id}`, config);
          return response.data;
        } catch (error) {
          console.error("Error deleting program:", error);
          throw error;
        }
      },
      getAllPrograms: async (id) => {
        try {
          const response = axios.get(`${API}/get-all-programs`);
          return response.data;
        } catch (error) {
          console.error("Error getting all programs:", error);
          throw error;
        }
      },
      getProgram: async (id) => {
        try {
          const response = axios.get(`${API}/get-program/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error getting program:", error);
          throw error;
        }
      },

      /**************************
     
      PLANS FUNCTIONS

       *************************/

      subscribePlan: async (
        id,
        plan,
        expires_date,
        email,
        firstname,
        lastname
      ) => {
        try {
          const response = await axios.put(
            `${API}/subscribe_plan/${id}`,
            {
              plan,
              expires_date,
              email,
              firstname,
              lastname,
            },
            config
          );
          const data = response.data;
          const store = getStore();
          setStore({ ...store, plan: data.plan });
          return data.message;
        } catch (error) {
          console.error("Error subscribing to", error);
        }
      },
    },
  };
};

export default getState;
