import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/AppContext";
import DropMenu from "./DropMenu";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  return (
    <div>
      <div>{/* <img src={logo} alt="logo gym" /> */}</div>
      <div>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <li
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", fontSize: "2rem" }}
          >
            HOME
          </li>
          <li>{store.user.id ? <DropMenu /> : <LoginButton />}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
