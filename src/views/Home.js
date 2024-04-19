import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/AppContext";

const Home = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  let id = store.user.id;
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/login")}>Go To Login</button>
      <br />
      <br />
      <button onClick={() => navigate(`/test/${id}`)}>Go To Test</button>
    </div>
  );
};

export default Home;
