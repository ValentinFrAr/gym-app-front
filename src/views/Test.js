import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { useParams } from "react-router";

const Test = () => {
  const { store, actions } = useContext(Context);
  let { id } = useParams();

  const getUser = async (id) => {
    await actions.getUserData(id);
  };
  useEffect(() => {
    getUser(id);
    console.log(id);
  }, []);
  return (
    <div>
      <h1>Firstname Here :</h1>
      <h1>{store.userData.firstname}</h1>
    </div>
  );
};

export default Test;
