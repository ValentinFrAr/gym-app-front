import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(`/user`)}>Go To User Settings</button>

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
