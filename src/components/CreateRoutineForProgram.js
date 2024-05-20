/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { Context } from "../store/AppContext";
import Calendar from "./Calendar";

const CreateRoutineForProgram = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userCalendar, setUserCalendar] = useState("");
  const programId = useLocation().state;
  const programIdParams = useParams();
  let navigate = useNavigate();
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const muscleList = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  const clearInputs = () => {
    setName("");
    setDescription("");
    setUserCalendar("");
  };

  const createYouProgram = async (e) => {
    e.preventDefault();
    try {
      const req = await actions.createRoutine(
        programId.programId || programIdParams,
        name,
        description,
        userCalendar
      );
      clearInputs();
      await actions.routineByProgramId(programId.programId || programIdParams);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Create Your Routine</h1>
        <div>
          <form onSubmit={createYouProgram}>
            <div>
              <label htmlFor="routine-name">Choose a Day</label>
              <select
                value={userCalendar}
                onChange={(e) => setUserCalendar(e.target.value)}
              >
                <option value="">Select Day</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Choose a muscle:</label>
              <select value={name} onChange={(e) => setName(e.target.value)}>
                <option value="">--Select a muscle--</option>
                {muscleList.map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle}
                  </option>
                ))}
              </select>
            </div>
            <input type="submit" value="Add routine" />
          </form>
        </div>
      </div>
      <div>
        <Calendar programId={programId.programId} pId={programIdParams.id} />
      </div>
    </div>
  );
};

export default CreateRoutineForProgram;
