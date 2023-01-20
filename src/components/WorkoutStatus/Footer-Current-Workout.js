import React from "react";

export default function FooterCurrentWorkout({
  restsCompleted,
  workoutsCompleted,
  workoutsLeft,
}) {
  return (
    <div className="flex flex-col gap-2 mt-4 supersm:text-lg text-sm">
      <p className=" text-gray-500">
        Workouts completed : {workoutsCompleted}
      </p>
      <p className=" text-gray-500 ">Workouts left : {workoutsLeft}</p>
      <p className=" text-gray-500">Current Set : {restsCompleted + 1}</p>
      <p className=" text-gray-500 ">Rests Taken : {restsCompleted}</p>
    </div>
  );
}
