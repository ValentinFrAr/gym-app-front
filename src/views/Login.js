/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(actions.login);
    if (password === "") {
      return actions.showNotification("Contraseña incompleta", "danger");
    }
    try {
      const response = await actions.login(email, password);
      console.log(response);
      if (
        response?.status &&
        (response?.status === 201 || response?.status === 200)
      ) {
        actions.showNotification("Inicio de sesion exitoso", "success");

        navigate("/");
        window.location.reload();
      } else {
        if (!response) {
          actions.showNotification("Datos incorrectos", "danger");
        }
      }
    } catch (error) {
      console.error("Error, problem SignIn", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <button>Enter</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
