import React from "react";
import { useNavigate } from "react-router";
import UserImage from "../components/UserImage";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <UserImage />
      <br />
      <br />
      <button onClick={() => navigate("/login")}>Go To Login</button>
      <br />
      <br />
      <button onClick={() => navigate(`/register`)}>Go To Register</button>
      <br />
      <br />
      <button onClick={() => navigate(`/users`)}>Go To Users Table</button>
      <br />
      <br />
      <button onClick={() => navigate(`/recipe`)}>Go To Create Recipe</button>
      <br />
      <br />
      <button onClick={() => navigate(`/recipes`)}>Go To All Recipes</button>
    </div>
  );
};

export default Home;
