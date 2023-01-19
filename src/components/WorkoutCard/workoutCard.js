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
  id,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const workout = {
    singleFolder,
    singleSubFolder,
    exerciseName,
    sets,
    reps,
    restBetweenSets,
    restAfterSetComplete,
    note,
  };
 
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

        <Details
          exerciseName={exerciseName}
          reps={reps}
          restAfterSetComplete={restAfterSetComplete}
          restBetweenSets={restBetweenSets}
          sets={sets}
        />
        {location.pathname !== "/workout" && (
          <CardButtons
     
            workout={workout}
            singleFolder={singleFolder}
            singleSubFolder={singleSubFolder}
            RemoveWorkout={RemoveWorkout}
            toggleNoteVisibility={toggleNoteVisibility}
          />
        )}
      </div>
    </>
  );
};
