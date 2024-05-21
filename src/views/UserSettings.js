/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../store/AppContext";
import UserImageSetting from "../components/UserImageSetting";
import UserDataSettings from "../components/UserDataSettings";

const UserSettings = () => {
  const { store, actions } = useContext(Context);

  return (
    <main className="profile-content">
      <div>
        <h1>Profile</h1>
      </div>
      <div>
        <UserImageSetting />
      </div>
      <div style={{ width: "60%" }}>
        <UserDataSettings />
      </div>
    </main>
  );
};

export default UserSettings;
