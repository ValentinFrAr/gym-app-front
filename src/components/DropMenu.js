/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import UserImage from "./UserImage";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";

const DropMenu = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const menu = ["Profile", "Favorites", "Settings", "Logout"];
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  function logout() {
    actions.logout();
    navigate("/");
    window.location.reload();
  }

  const handleMenuItemClick = (i) => {
    if (i === "Logout") logout();
    if (i === "Profile") navigate();
    if (i === "Favorites") navigate();
    if (i === "Settings") navigate();
    setOpen(false);
  };

  return (
    <div className="menu-content" style={{ position: "relative" }}>
      <UserImage imgRef={imgRef} setOpen={setOpen} open={open} />
      {open && (
        <div
          ref={menuRef}
          style={{ position: "absolute", left: "30px", top: "120px" }}
        >
          <ul>
            {menu.map((i) => (
              <li
                onClick={() => handleMenuItemClick(i)}
                style={{ cursor: "pointer", padding: "5px", margin: "7px" }}
                key={i}
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropMenu;
