import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/AppContext";

const Navbar = () => {
  const { actions } = useContext(Context);
  let navigate = useNavigate();
  function logout() {
    actions.logout();
    navigate("/");
    window.location.reload();
  }
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
          <li
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", fontSize: "2rem" }}
          >
            home
          </li>
          <li
            onClick={logout}
            style={{ cursor: "pointer", fontSize: "2rem", color: "red" }}
          >
            logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
