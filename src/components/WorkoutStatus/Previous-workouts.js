import React from "react";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
export default function PreviousWorkouts({ previousWorkouts }) {
  return (
    <>
      <h1 className="mt-3 text-3xl text-center text-gray-800 group-hover:text-primary ">
        Previous Workouts
      </h1>
      {previousWorkouts.filter(Boolean).length
        ? previousWorkouts.map((workout, i) => {
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
