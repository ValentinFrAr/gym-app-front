/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";

const UserDataSettings = () => {
  const { store, actions } = useContext(Context);
  const [phone, setPhone] = useState(store.userData.phone || "");
  const [email, setEmail] = useState(store.userData.email || "");
  const [address, setAddress] = useState(store.userData.address || "");
  const [password, setPassword] = useState("");
  const [editPass, setEditPass] = useState(false);
  let navigate = useNavigate();

  const userData = async () => {
    if (store.user.id) {
      await actions.getUserData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.updateUserData(
        email,
        phone,
        address,
        store.userData.is_admin,
        password,
        store.userData.user_id,
        store.userData.firstname,
        store.userData.lastname
      );
      await actions.getUserData();
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    if (store.user.id) {
      userData();
    }
  }, [store.user.id]);

  return (
    <div>
      <h1>USER DATA</h1>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              id="firstname"
              autoComplete="off"
              className="input"
              type="text"
              placeholder="John"
              defaultValue={store.userData.firstname}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              id="lastname"
              autoComplete="off"
              className="input"
              type="text"
              placeholder="Doe"
              defaultValue={store.userData.lastname}
              readOnly
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              autoComplete="off"
              className="input"
              type="text"
              placeholder="+1123456789"
              value={phone || store.userData.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              autoComplete="off"
              className="input"
              type="email"
              placeholder="Email@email.com"
              value={email || store.userData.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              autoComplete="off"
              className="input"
              type="text"
              placeholder="123 main street"
              value={address || store.userData.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Plan:</label>
            <input
              autoComplete="off"
              className="input"
              type="text"
              defaultValue={store.userData.plan}
              readOnly
            />
          </div>
        </div>
        {!editPass ? (
          <input
            onClick={() => setEditPass(true)}
            value="Change Password"
            type="submit"
            className="login-button"
          />
        ) : (
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              value={"" || password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <input
              onClick={() => setEditPass(false)}
              value="Cancel"
              type="submit"
              className="login-button"
            />
          </div>
        )}
        <div>
          <input value="Update" type="submit" className="login-button" />
          <input
            value="Cancel"
            className="login-button cancel-btn"
            type="button"
            onClick={() => navigate("/")}
          />
        </div>
      </form>
    </div>
  );
};

export default UserDataSettings;
