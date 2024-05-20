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
      user: [], // data user logged
      users: [], // data all users
      userData: {}, // data user By Id
      isAuth: false, // verifying token
      plan: [], //
      programs: [], // data all programs
      programById: [], // program by id
      routinesByProgramId: [],
      plans: [],
      recipes: [], // all recipes data
      recipeData: {}, // data recipe by ID
      favoritedRecipes: [], // favorited recipes
      usersImage: {}, // user image
      exercises: [],
      exerciseByRoutineId: [],
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
      uploadPhoto: async (userId, photoFile) => {
        const actions = getActions();
        try {
          const formData = new FormData();
          formData.append("photo", photoFile);

          const response = await axios.post(
            `${API}/update-photo/${userId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            config
          );
          return response;
        } catch (error) {
          console.error("Error uploading photo:", error);
          return null;
        }
      },
      getUserImage: async (userId) => {
        try {
          const res = axios.get(`${API}/get-photo/${userId}`, config);
          const photoUrl = res.data.photoUrl;
          const store = getStore();
          setStore({ ...store, usersImage: photoUrl });
          return photoUrl;
        } catch (error) {
          console.error("Error getting photo:", error);
          return null;
        }
      },

      /******************************************************************************************
        
            ********************************AUTH FUNCTIONS

     ********************************************************************************************/

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
      getUserData: async () => {
        try {
          const response = await axios.get(`${API}/user`, config);
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
      updateUserData: async (
        email,
        phone,
        address,
        is_admin,
        password,
        id,
        firstname,
        lastname
      ) => {
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
              firstname,
              lastname,
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
      logout: () => {
        const store = getStore();
        let token = Cookies.remove("jwt");
        setStore({
          ...store,
          isAuth: false,
          response: { type: "success", message: "Successful logout." },
        });
        return token != null ? true : false;
      },

      /****************************************************************************************
     
      *************************************PROGRAMS FUNCTIONS

       ***************************************************************************************/

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
        }
      },
      updateProgram: async (
        id,
        name,
        description,
        weekly_routine,
        duration_program
      ) => {
        try {
          const response = axios.put(
            `${API}/modificate-program/${id}`,
            { id, name, description, weekly_routine, duration_program },
            config
          );
          return response.data;
        } catch (error) {
          console.error("Error updating program:", error);
        }
      },
      deleteProgram: async (id) => {
        try {
          const response = axios.delete(`${API}/delete-program/${id}`, config);
          return response.data;
        } catch (error) {
          console.error("Error deleting program:", error);
        }
      },
      getAllPrograms: async () => {
        try {
          const response = await axios.get(`${API}/get-all-programs`);
          console.log(response);
          const store = getStore();
          setStore({ ...store, programs: response.data.programs });
          return response.data;
        } catch (error) {
          console.error("Error getting all programs:", error);
        }
      },
      getProgram: async (id) => {
        try {
          const response = axios.get(`${API}/get-program/${id}`);
          const store = getStore();
          setStore({ ...store, programById: response.data.program });
          return response.data;
        } catch (error) {
          console.error("Error getting program:", error);
          return error;
        }
      },

      /******************************************************************************************
     
      ****************************************PLANS FUNCTIONS

       *****************************************************************************************/

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

      /******************************************************************************************
       *
       ***************************************** RECIPES FUNCTIONS
       *
       *******************************************************************************************/

      createRecipe: async (name, description, ingredients, objective) => {
        try {
          const response = await axios.post(
            `${API}/create-recipe`,
            { name, description, ingredients, objective },
            config
          );
          if (response.status === 201) {
            console.log("recipe created successfully");
            return response.data;
          }
        } catch (error) {
          console.error("error creating recipe from flux", error);
        }
      },
      getAllRecipes: async () => {
        try {
          const response = await axios.get(`${API}//get-all-recipes`, config);
          const data = response.data;
          const store = getStore();
          setStore({ ...store, recipes: data.recipes });
          return data.recipes;
        } catch (error) {
          console.error("Error getting recipes", error);
        }
      },
      getRecipeById: async (id) => {
        try {
          const res = await axios.get(`${API}/get-recipe/${id}`, config);
          const data = res.data;
          const store = getStore();
          setStore({ ...store, recipeData: data.recipe });
          return data.recipe;
        } catch (error) {
          console.error("Error getting your recipe", error);
        }
      },
      deleteRecipe: async (recipeId) => {
        try {
          const response = await axios.delete(
            `${API}/delete-recipe/${recipeId}`,
            config
          );
          console.log(response);
          if (response.status === 200) {
            setStore((prevStore) => {
              const updatedRecipes = prevStore.recipes.filter(
                (recipe) => recipe.id !== recipeId
              );
              // actions.showNotification("User deleted successfully", "success");
              console.log("deleted FROM FLUX");
              return { ...prevStore, recipes: updatedRecipes };
            });
          }
        } catch (error) {
          console.error("Error deleting recipe", error);
        }
      },
      editRecipe: async (name, description, ingredients, objective, id) => {
        try {
          const response = await axios.put(
            `${API}/update-recipe/${id}`,
            { name, description, ingredients, objective, id },
            config
          );
          if (response.status === 200) {
            return response;
          }
        } catch (error) {
          console.log("Error updating recipe", error);
        }
      },
      /*****************************************************************************************
       *
       ************************************* FAVORITES ROUTES
       *
       *****************************************************************************************/
      addFavoriteRecipe: async (userId, recipeId) => {
        const actions = getActions();
        try {
          const res = await axios.post(
            `${API}/add-favorite-recipe`,
            { userId, recipeId },
            config
          );
          await actions.getFavoritedRecipes();
        } catch (error) {
          console.error("error adding favorite recipe", error);
        }
      },
      deleteFavoritedRecipe: async (recipeId) => {
        try {
          const response = await axios.delete(
            `${API}/delete-favorite-recipe/${recipeId}`,
            config
          );
          if (response.status === 200) {
            const store = getStore();
            const updatedFavRecipes = store.favoritedRecipes.filter(
              (recipe) => recipe.id !== recipeId
            );

            setStore({ ...store, favoritedRecipes: updatedFavRecipes });
            console.log("favorite recipe deleted");
          }
        } catch (error) {
          console.error("Error deleting favorited recipe", error);
        }
      },
      getFavoritedRecipes: async () => {
        try {
          const res = await axios.get(
            `${API}/get-all-favorite-recipes`,
            config
          );
          const data = res.data;
          const store = getStore();
          setStore({ ...store, favoritedRecipes: data.result });
          return data.result;
        } catch (error) {
          console.error("error getting favorited recipes", error);
        }
      },
      /*************************************************************************************
       *
       * ************************* ROUTINES FUNCTIONS
       *
       ************************************************************************************/
      createRoutine: async (programId, name, description, userCalendar) => {
        const actions = getActions();
        try {
          const response = await axios.post(
            `${API}/create-routine`,
            { programId, name, description, userCalendar },
            config
          );
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },
      routineByProgramId: async (programId) => {
        try {
          const res = await axios.get(
            `${API}/get-routine-by-program/${programId}`,
            config
          );
          const data = res.data;
          const store = getStore();
          setStore({ ...store, routinesByProgramId: data.routines });
          return data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteRoutine: async (id) => {
        try {
          const res = await axios.delete(`${API}/delete-routine/${id}`, config);
          if (res.status === 200) {
            setStore((prevStore) => {
              const updatedRoutine = prevStore.routinesByProgramId.filter(
                (routine) => routine.id !== id
              );
              // actions.showNotification("User deleted successfully", "success");
              console.log("deleted FROM FLUX");
              return { ...prevStore, routinesByProgramId: updatedRoutine };
            });
          }
        } catch (error) {
          console.error("Error deleting routine", error);
        }
      },

      /*****************************************************************************
       *
       * ***************************EXERCISES FUNCTIONS*****************************
       *
       *****************************************************************************/
      getExercises: async () => {
        try {
          const res = await axios.get(`${API}/get-all-exercises`);
          const data = res.data;
          const store = getStore();
          setStore({ ...store, exercises: data.exercises });
          return data;
        } catch (error) {
          console.error(error);
        }
      },
      addExerciseToRoutine: async (
        routineId,
        exerciseId,
        sets,
        repetitions
      ) => {
        try {
          const res = await axios.post(
            `${API}/add-exercise-routine`,
            { routineId, exerciseId, sets, repetitions },
            config
          );
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      getExerciseByRoutineId: async (routineId) => {
        try {
          const res = await axios.get(`${API}/get-exercise-routine`);
          const data = res.data;
          const store = getStore();
          setStore({ ...store, exerciseByRoutineId: data.result });
          return data;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
