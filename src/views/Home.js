import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/login")}>Go To Login</button>
    </div>
  );
};

export default Home;
