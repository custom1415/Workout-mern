import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeWorkout } from "../../redux/workout/workout";
import { CardButtons } from "./card-buttons";
import Details from "./details";
import { Note } from "./Note";

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
        <Note
          note={note}
          NoteVisibility={NoteVisibility}
          toggleNoteVisibility={toggleNoteVisibility}
        />

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
