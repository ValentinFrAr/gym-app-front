/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";

const RoutineExecises = ({ routineId }) => {
  const { store, actions } = useContext(Context);

  const fetchExercises = async () => {
    await actions.getExerciseByRoutineId();
  };

  useEffect(() => {
    if (store.user.id) {
      fetchExercises();
    }
  }, [store.user.id]);

  const exercisesByRoutine = store.exerciseByRoutineId.filter(
    (exercise) => exercise.routine_id === routineId
  );

  return (
    <div>
      {exercisesByRoutine.length > 0 ? (
        exercisesByRoutine.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>Sets: {item.sets}</p>
            <p>Reps: {item.repetitions}</p>
          </div>
        ))
      ) : (
        <p>No exercises found for this routine.</p>
      )}
    </div>
  );
};

export default RoutineExecises;
