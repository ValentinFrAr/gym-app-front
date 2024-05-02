import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Context } from "../store/AppContext";

const ViewProgram = () => {
  const navigate = useNavigate();
  const { programData } = useLocation().state;
  const { actions } = useContext(Context);
  const id = programData.id;
  const [name, setName] = useState(programData.name || "");
  const [description, setDescription] = useState(programData.description || "");
  const [weeklyRoutine, setWeeklyRoutine] = useState(
    programData.weekly_routine || ""
  );
  const [duration, setDuration] = useState(programData.duration_program || "");

  const updateProgram = async (e) => {
    e.preventDefault();
    try {
      const req = await actions.updateProgram(
        id,
        name,
        description,
        weeklyRoutine,
        duration
      );
      alert("Program successfully updated");
      navigate("/get-all-programs");
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div>
      <h1>Program Data:</h1>

      <form className="newProgramForm" onSubmit={updateProgram}>
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
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration Program"
        />

        <input type="submit" value="edit" className="btn buttons btn-primary" />
      </form>
    </div>
  );
};

export default ViewProgram;
