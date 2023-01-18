import React from "react";
import { useNavigate } from "react-router-dom";

export default function WorkoutListHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" shadow-black shadow-sm pt-8 pb-4 text-white  flex items-center justify-between px-6   relative -top-4  z-[100] ">
        <h1 className="midsm:text-3xl text-2xl text-primary">Workout List</h1>
        <button
          className="inline-block px-3 py-2 bg-primary text-gray-900 rounded-sm cursor-pointer  hover:brightness-75 "
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => navigate("/")}
        >
          Create
        </button>
      </div>
    </>
  );
}
