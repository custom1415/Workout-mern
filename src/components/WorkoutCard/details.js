import React from "react";

export default function Details({
  exerciseName,
  restAfterSetComplete,
  restBetweenSets,
  reps,
  sets,
}) {
  return (
    <>
      <h1 className="overflow-hidden text-2xl text-center text-white ">
        {exerciseName || "Push Pull"}
      </h1>
      <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
        Sets : <span>{sets || "0"}</span>
      </p>
      <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
        Reps : <span>{reps || "0"}</span>
      </p>
      <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
        Rest Between Sets : <span>{restBetweenSets || "0"}</span> mins
      </p>
      <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
        Rest After Set : <span>{restAfterSetComplete || "0"}</span> mins
      </p>
    </>
  );
}
