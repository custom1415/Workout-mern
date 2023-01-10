import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetRest,
  selectRestButtonVisibility,
  selectRestCount,
  setRestBtnVisibility,
  setRestCount,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";

const RestTimer = ({
  duration,
  shouldReset,
  currentDayWorkouts,
  currentWorkout,
}) => {
  // console.log(currentWorkout, "length");

  const { exerciseName } = duration[0];

  const [Exercise, setExercise] = useState(duration[0]);
  const { restBetweenSets, restAfterSetComplete, sets } = Exercise;
  const [minutes, setMinutes] = useState(restBetweenSets);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [previousWorkout, setPreviousWorkout] = useState("");
  const restCount = useSelector(selectRestCount);
  const isRestButtonShown = useSelector(selectRestButtonVisibility);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldReset) {
      setMinutes(restBetweenSets);
      setSeconds(0);
      dispatch(resetRest());
      setIsRunning(false);
    }
  }, [shouldReset]);

  useEffect(() => {
    const w = currentDayWorkouts.find(
      (workout) => workout.exerciseName === duration[0].exerciseName
    );

    if (w) {
      setExercise(w);
      setMinutes(w.restBetweenSets);
      // setrestCount(0);
      dispatch(resetRest());
    } else if (previousWorkout) {
      navigate("/");
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
    console.log(restCount);
    console.log(isRunning);
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
          console.log("clleddd");

          dispatch(setRestCount(restCount + 1));
          setPreviousWorkout(Exercise.exerciseName);
          console.log(isRunning);
          clearInterval(interval);
        }
      }, 10);
    } else if (!isRunning && minutes !== restBetweenSets) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  //   function handleReset() {
  //     setMinutes(duration);
  //     setSeconds(0);
  //   }

  return (
    <>
      {currentWorkout ? (
        <div className="w-full text-white p-6 left-0 absolute lg:bottom-0 bottom-12 flex justify-between items-center max-h-20">
          <div
            className={`${
              isRunning || !isRestButtonShown
                ? "w-full flex justify-center items-center text-2xl"
                : ""
            }`}
          >
            Rest - {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          {!isRestButtonShown && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-gray-800 w-full p-6 text-center">
              You can only rest after 30sec
            </div>
          )}
          {!isRunning && isRestButtonShown && (
            <Button click={handleStart}>Rest</Button>
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
