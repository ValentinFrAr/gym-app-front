/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      return actions.showNotification("Contraseña incompleta", "danger");
    }
    try {
      const response = await actions.login(email, password);
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
    <div className="container">
      <div className="heading">Sign In</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="input"
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
          className="input"
        />
        <div className="span-forgot-signup">
          <span className="forgot-password">
            <a href="#">Forgot Password?</a>
          </span>
          <span className="forgot-password">
            <Link to="/register">Don't you have an account? Sign Up</Link>
          </span>
        </div>
        <input value="Sign In" type="submit" className="login-button" />
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <button className="social-button google">
            <svg
              viewBox="0 0 488 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="svg"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </button>
        </div>
      </div>
      <span className="agreement">
        <a href="#">Learn user licence agreement</a>
      </span>
    </div>
  );
};

export default Login;
