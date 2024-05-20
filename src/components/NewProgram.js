/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";

const NewProgram = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weeklyRoutine, setWeeklyRoutine] = useState("");
  const [durationProgram, setDurationProgram] = useState("");
  let navigate = useNavigate();

  const createProgram = async (e) => {
    e.preventDefault();
    try {
      const req = await actions.createProgram(
        name,
        description,
        weeklyRoutine,
        durationProgram,
        store.user.id
      );
      navigate(`/program/${req.program}/create-routine`, {
        state: { programId: req.program },
      });
      return console.log(req.message);
    } catch (error) {
      console.error("Connection failed to create new program", error);
    }
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setWeeklyRoutine("");
    setDurationProgram("");
  };

  return (
    <>
      {store.user ? (
        <div>
          <h1 className="">Create new program</h1>
          <form className="newProgramForm" onSubmit={createProgram}>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Program Name"
            />
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Program Description"
            />
            <input
              type="text"
              required
              value={weeklyRoutine}
              onChange={(e) => setWeeklyRoutine(e.target.value)}
              placeholder="Weekly routine"
            />
            <input
              type="text"
              required
              value={durationProgram}
              onChange={(e) => setDurationProgram(e.target.value)}
              placeholder="Duration Program"
            />

            <input
              type="submit"
              value="Create"
              className="btn buttons btn-primary"
            />
            <input
              className="btn buttons"
              type="button"
              value="Cancel"
              onClick={(e) => clearInputs()}
            />
          </form>
        </div>
      ) : (
        <h1>Access Denied!</h1>
      )}
    </>
  );
};

export default NewProgram;
