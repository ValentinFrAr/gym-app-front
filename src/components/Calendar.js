/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../store/AppContext";
import RoutinesByDay from "./RoutinesByDay";

const Calendar = ({ programId, pId, muscle }) => {
  const { store, actions } = useContext(Context);
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return (
    <div style={{ display: "flex" }}>
      {daysOfWeek.map((day) => (
        <div style={{ padding: "20px" }} key={day}>
          <h2>{day}</h2>
          <RoutinesByDay
            daysOfWeek={daysOfWeek}
            day={day}
            pId={pId}
            programId={programId}
          />
        </div>
      ))}
    </div>
  );
};

export default Calendar;
