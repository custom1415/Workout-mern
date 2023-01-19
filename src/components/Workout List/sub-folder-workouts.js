
import { WorkoutCard } from "../WorkoutCard/workoutCard";
export default function FolderWorkouts({ folderValue, folder, singleFolder }) {
  return (
    <>
      {folderValue.map((workout) => {
        const {
          exerciseName,
          reps,
          sets,
          restBetweenSets,
          restAfterSetComplete,
          note,
          id,
        } = workout;

        return (
          <div
            key={id}
            id={folder}
            className=" collapse w-full transition-all"
            data-bs-parent="#parentB"
          >
            <WorkoutCard
            id={id}
              exerciseName={exerciseName}
              reps={reps}
              sets={sets}
              restAfterSetComplete={restAfterSetComplete}
              note={note}
              singleFolder={singleFolder}
              singleSubFolder={folder}
              restBetweenSets={restBetweenSets}
            />
          </div>
        );
      })}
    </>
  );
}
