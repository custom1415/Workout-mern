import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import { Button } from "../components/Button/button";
import {
  selectCurrentDayWorkouts,
  selectTotalTimeTaken,
  selectWorkoutCompleted,
  workoutCompleted,
} from "../redux/workout/workout";
export const WorkoutComplete = () => {
  const navigate = useNavigate();
  const todaysDay = useSelector((state) => state.workout.workoutToday);
  const currentDayWorkouts = useSelector(selectCurrentDayWorkouts);
  const isWorkoutComplete = useSelector(selectWorkoutCompleted);
  const dispatch = useDispatch();

  useBeforeUnload(
    React.useCallback(() => {
      dispatch(workoutCompleted(false));
    }, [])
  );
  useEffect(() => {
    if (isWorkoutComplete) {
    } else {
      navigate("/");
    }
  }, [isWorkoutComplete]);
  const totalSets = currentDayWorkouts.reduce(
    (total, workout) => total + Number(workout.sets),
    0
  );
  const totalRestBetween = currentDayWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.restBetweenSets * (workout.sets - 1)),
    0
  );
  const totalRestAfter = currentDayWorkouts.reduce(
    (total, workout) => total + Number(workout.restAfterSetComplete),
    0
  );
  const totalRest = totalRestBetween + totalRestAfter;
  const { mins, secs } = useSelector(selectTotalTimeTaken);

  return (
    <div className="w-full h-screen bg-gray-900 pt-9 flex flex-col items-center px-8">
      <h1
        className="text-white supersm:text-3xl text-2xl text-center  
  "
      >
        Congrats! The Workout is Complete
      </h1>

      <div className="w-1/2  my-8">
        <div className="grid place-content-center gap-3 auto text-white min-w-max">
          <p>
            Workout - <span className="text-primary">{todaysDay}</span>
          </p>
          <p>
            Total Time -{" "}
            <span className="text-primary">
              {Number(mins)}min {Number(secs)}sec
            </span>
          </p>
          <p>
            Total Rest - <span className="text-primary">{totalRest}min</span>
          </p>
          <p>
            Total Sets - <span className="text-primary">{totalSets}sets</span>
          </p>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/");
          dispatch(workoutCompleted(false));
        }}
      >
        Back to home
      </Button>
    </div>
  );
};
