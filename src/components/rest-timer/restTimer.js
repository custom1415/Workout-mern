import React, { useState, useEffect, useCallback } from "react";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  activateToaster,
  resetRest,
  selectRestButtonVisibility,
  selectRestCount,
  setRestBtnVisibility,
  setRestCount,
  workoutCompleted,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";

const RestTimer = ({
  currentExercise,
  shouldReset,
  currentDayWorkouts,
  currentWorkout,
}) => {
  //

  const { exerciseName } = currentExercise[0];

  const [Exercise, setExercise] = useState(currentExercise[0]);
  const { restBetweenSets, restAfterSetComplete, sets } = Exercise;
  const [minutes, setMinutes] = useState(restBetweenSets);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [previousWorkout, setPreviousWorkout] = useState("");
  const restCount = useSelector(selectRestCount);
  const [isHidden, setIsHidden] = useState(false);
  const isRestButtonShown = useSelector(selectRestButtonVisibility);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldReset) {
      setMinutes(restBetweenSets);
      setSeconds(0);
      dispatch(resetRest());
      setIsRunning(false);
      setIsHidden(false)

    }
  }, [shouldReset]);

  useEffect(() => {
    const w = currentDayWorkouts.find(
      (workout) => workout.exerciseName === currentExercise[0].exerciseName
    );

    if (w) {
      setExercise(w);
      setMinutes(w.restBetweenSets);
      // setrestCount(0);
      dispatch(resetRest());
    } else if (previousWorkout) {
      dispatch(workoutCompleted(true));
    }
  }, [exerciseName]);
  useEffect(() => {
    if (Number(restCount) === Number(sets - 1)) {
      setMinutes(Number(restAfterSetComplete));
    } else {
      setMinutes(restBetweenSets);
    }
  }, [restCount]);

  useEffect(() => {
    dispatch(setRestBtnVisibility(false));
  }, []);
  useEffect(() => {
    if (restCount >= 1 && !isRunning) {
      dispatch(setRestBtnVisibility(false));
    }
  }, [restCount, isRunning]);

  // useEffect(() => {
  //   if (!isRestButtonShown) {
  //     setMinutes(restBetweenSets);
  //     setSeconds(0);
  //   }
  //   clearInterval(interval);
  // }, [isRestButtonShown]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (Number(minutes) === 0 && Number(seconds) === 0) {
          // setrestCount((prev) => prev + 1);
          setIsRunning(!isRunning);
          dispatch(setRestCount(restCount + 1));

          setPreviousWorkout(Exercise.exerciseName);
          setIsHidden(false);
          clearInterval(interval);
        }
      }, 1000);
    } else if (!isRunning && minutes !== restBetweenSets) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  function handleStart() {
    if (!isRestButtonShown) {
      dispatch(activateToaster("You can only rest after 30sec "));
      return;
    }
    setIsHidden(true);
    setIsRunning(true);
  }

  //   function handleReset() {
  //     setMinutes(currentExercise);
  //     setSeconds(0);
  //   }

  return (
    <>
      {currentWorkout ? (
        <div className="w-full px-4 h-20 text-white left-0 fixed bg-blue-600 lg:bottom-0 bottom-12 flex justify-between items-center max-h-20">
          <div className="w-full flex justify-center items-center  text-2xl">
            Rest - {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>

          {!isHidden && (
            <div
              className={`${
                isRestButtonShown ? "opacity-100" : "opacity-50 visible"
              } relative `}
            >
              <Button onClick={handleStart}>
                <span
                  className={`inline-block ${
                    isRestButtonShown ? "" : "-translate-x-2"
                  } transition-all`}
                >
                  Rest
                </span>
              </Button>
              {!isRestButtonShown && (
                <FaLock className="absolute top-1/2 text-primary z-50 text-sm -translate-y-2/3 right-[15%]" />
              )}
            </div>
          )}

          {/* {isRunning && <button onClick={handleStop}>Stop</button>}
      <button onClick={handleReset}>Reset</button> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RestTimer;
