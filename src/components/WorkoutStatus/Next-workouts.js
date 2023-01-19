import React from "react";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
export default function NextWorkouts({ nextWorkouts }) {
  return (
    <>
      {nextWorkouts.length
        ? nextWorkouts.map((workout, i) => {
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
                exerciseName={exerciseName}
                reps={reps}
                sets={sets}
                restAfterSetComplete={restAfterSetComplete}
                restBetweenSets={restBetweenSets}
              />
            );
          })
        : null}
    </>
  );
}
