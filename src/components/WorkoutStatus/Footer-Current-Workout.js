import React from "react";

export default function FooterCurrentWorkout({
  restsCompleted,
  workoutsCompleted,
  workoutsLeft,
}) {
  return (
    <>
      <p className="mt-3 text-gray-500">
        Workouts completed : {workoutsCompleted}
      </p>
      <p className="mt-3 text-gray-500 ">Workouts left : {workoutsLeft}</p>
      <p className="mt-3 text-gray-500">Current Set : {restsCompleted + 1}</p>
      <p className="mt-3 text-gray-500 ">Rests Taken : {restsCompleted}</p>
    </>
  );
}
