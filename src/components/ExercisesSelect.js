/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import RoutineExecises from "./RoutineExecises";

const ExercisesSelect = ({ muscle }) => {
  const { store, actions } = useContext(Context);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [selectedExerciseName, setSelectedExerciseName] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);

  const addExercise = async (e) => {
    e.preventDefault();
    try {
      const routineId = muscle.id;
      const selectedExercise = filteredExercises.find(
        (exercise) => exercise.name === selectedExerciseName
      );
      if (!selectedExercise) {
        throw new Error("Exercise not found");
      }
      const exerciseId = selectedExercise.id;
      const req = await actions.addExerciseToRoutine(
        routineId,
        exerciseId,
        parseInt(sets),
        parseInt(reps)
      );
      await actions.getExerciseByRoutineId();
    } catch (error) {
      console.error(error);
    }
  };

  const getExercises = async () => {
    try {
      const res = await actions.getExercises();
      setFilteredExercises(
        res.exercises.filter((exercise) => exercise.muscle === muscle.name)
      );
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    if (store.user.id) {
      getExercises();
    }
  }, [store.user.id, muscle]);

  return (
    <div>
      <form onSubmit={addExercise}>
        <div>
          <label>
            Exercise:
            <select
              value={selectedExerciseName}
              onChange={(e) => setSelectedExerciseName(e.target.value)}
            >
              <option value="" disabled>
                Select an exercise
              </option>
              {filteredExercises.length > 0 &&
                filteredExercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
            </select>
          </label>
          <div>
            <label>sets: </label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div>
            <label>reps: </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="Add exercise" />
      </form>
      <div>
        <RoutineExecises
          routineId={muscle.id}
          filteredExercises={filteredExercises}
        />
      </div>
    </div>
  );
};

export default ExercisesSelect;
