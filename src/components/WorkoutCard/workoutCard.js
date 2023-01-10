// import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { BiNote } from "react-icons/bi";

import { useState } from "react";
import { FaEdit, FaStickyNote, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { activateToaster, removeWorkout } from "../../redux/workout/workout";

export const WorkoutCard = ({
  singleFolder,
  singleSubFolder,
  exerciseName,
  sets,
  reps,
  restBetweenSets,
  restAfterSetComplete,
  note,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(singleFolder, singleSubFolder);
  const RemoveWorkout = () =>
    dispatch(
      removeWorkout({
        mainFolder: singleFolder,
        subFolder: singleSubFolder,
        exerciseName,
      })
    );
  const [NoteVisibility, setNoteVisibility] = useState(false);
  const toggleNoteVisibility = () => {
    if (note) {
      setNoteVisibility(!NoteVisibility);
      return;
    }
  };

  return (
    <>
      <div className=" w-full  border border-gray-500 mt-4 px-4 py-2 hover:border-primary relative bg-gray-900 overflow-hidden">
        <div
          className={`absolute z-50 top-0 left-0 w-full h-full text-white bg-gray-800 ${
            NoteVisibility ? "block" : "hidden"
          }`}
          onClick={toggleNoteVisibility}
        >
          <span className="inline-block m-3 ">Note : </span>
          <span>{note}</span>
        </div>
        {location.pathname !== "/workout" && (
          <div className="absolute top-4 right-4 gap-2 flex justify-between items-center text-white z-10">
            <span className=" bg-blue-700 inline-block p-1 hover:bg-blue-800 ">
              <FaStickyNote onClick={toggleNoteVisibility} />
            </span>
            <span className=" bg-blue-700 inline-block p-1 hover:bg-blue-800 ">
              <FaEdit />
            </span>
            <span
              className=" bg-red-600 inline-block p-1 hover:bg-red-700"
              onClick={RemoveWorkout}
            >
              <FaTrashAlt />
            </span>
          </div>
        )}
        <h1 className="text-white text-center text-2xl overflow-hidden ">
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
      </div>
    </>
  );
};
