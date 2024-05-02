/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../store/AppContext";
import UserImageSetting from "../components/UserImageSetting";
import UserDataSettings from "../components/UserDataSettings";

const UserSettings = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div>
        <UserImageSetting />
      </div>
      <div>
        <UserDataSettings />
      </div>
    </div>
  );
};

export default UserSettings;
