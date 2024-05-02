import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/login")}>Go To Login</button>
      <br />
      <br />
      <button onClick={() => navigate(`/register`)}>Go To Register</button>
      <br />
      <br />
      <button onClick={() => navigate(`/users`)}>Go To Users Table</button>
      <br />
      <br />
      <button onClick={() => navigate(`/new-program`)}>Go To New Program</button>
      <br />
      <br />
      <button onClick={() => navigate(`/get-all-programs`)}>View all programs</button>
    </div>
  );
};

export default Home;
