import React from "react";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
export default function CurrentWorkouts({ currentWorkout }) {
  return (
    <>
      {currentWorkout.map((workout, i) => {
        const {
          exerciseName,
          reps,
          sets,
          restBetweenSets,
          restAfterSetComplete,
        } = workout;
        return (
          <WorkoutCard
            key={i}
            exerciseName={exerciseName || ""}
            reps={reps || 0}
            sets={sets || 0}
            restAfterSetComplete={restAfterSetComplete || 0}
            restBetweenSets={restBetweenSets || 0}
          />
        );
      })
      }
    </>
  );
}
