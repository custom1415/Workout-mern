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
    setNoteVisibility(!NoteVisibility);
    return;
  };

  return (
    <>
      <div className=" w-full group  border border-gray-500 mt-4 px-4 py-2 hover:border-primary relative bg-gray-900 overflow-hidden">
        <div
          className={`absolute  top-0 left-0 w-full h-full text-white bg-gray-800  px-4
          transition-all
          ${
            NoteVisibility
              ? "translate-y-0 opacity-100 z-50"
              : "translate-y-4 opacity-0 pointer-events-none"
          }`}
          onClick={toggleNoteVisibility}
        >
          {note ? <span className="inline-block m-3 mb-0 text-gray-600">Note : </span> : <></>}
          <span>
            {note || <h1 className="block m-3 text-center ">No Notes Set</h1>}
          </span>
        </div>
        {location.pathname !== "/workout" && (
          <div
            className={` absolute bottom-0 transition-all right-0 gap-2 h-12 pr-4 group-hover:opacity-100 justify-end  opacity-0 group-hover:translate-y-0 translate-y-4 w-full flex items-center bg-gray-900 text-white z-10`}
          >
            <span className=" bg-blue-700 inline-block p-1 hover:bg-blue-800 " onClick={toggleNoteVisibility}>
              <FaStickyNote  />
            </span>
            <span
              className=" bg-blue-700 inline-block p-1 hover:bg-blue-800 "
              data-bs-toggle="modal"
              data-bs-target="#edit-modal"
            >
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
