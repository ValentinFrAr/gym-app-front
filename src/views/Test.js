/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { useParams } from "react-router";

const Test = () => {
  const { store, actions } = useContext(Context);
  let { id } = useParams();

  const getUser = async (id) => {
    await actions.getUserData(id);
    await actions.getAllUsers();
  };
  useEffect(() => {
    getUser(id);
  }, []);
  return (
    <div>
      <h1>Firstname By ID Here: </h1>
      <h2>{store.userData.firstname}</h2>
      <br />
      <h1>All Users:</h1>
      {store.users?.length > 0 &&
        store.users.map((user) => (
          <div>
            <h2>{user.firstname}</h2>
            <h2>{user.lastname}</h2>
            <h2>{user.email}</h2>
          </div>
        ))}
    </div>
  );
};

export default Test;
