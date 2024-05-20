/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import ExercisesSelect from "./ExercisesSelect";

const RoutinesByDay = ({ programId, pId, day }) => {
  const { store, actions } = useContext(Context);

  const handleDelete = async (id) => {
    try {
      await actions.deleteRoutine(id);

      getRoutine();
    } catch (error) {
      console.error("Error deleting routine by id", error);
    }
  };

  const getRoutine = async () => {
    if (store.user.id) {
      await actions.routineByProgramId(programId || pId);
    }
  };

  useEffect(() => {
    if (store.user.id) {
      getRoutine();
    }
  }, [store.user.id]);

  return (
    <div>
      <div>
        {store.routinesByProgramId?.length > 0 &&
          store.routinesByProgramId.map((routine) =>
            routine.user_calendar === day ? (
              <div key={routine.id}>
                <div style={{ display: "flex" }}>
                  <div style={{ paddingRight: "4px" }}>
                    <p>{routine.name} </p>
                  </div>
                  <button onClick={() => handleDelete(routine.id)}>x</button>
                </div>
                <br />
                <div>
                  <ExercisesSelect muscle={routine} /> <br />
                  <br />
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default RoutinesByDay;
