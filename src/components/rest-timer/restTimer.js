import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/button";

function RestTimer({
  duration,
  getRestCount,
  currentDayWorkouts,
  currentWorkout,
}) {
  console.log(currentWorkout, "length");

  const { exerciseName } = duration[0];
  const [Exercise, setExercise] = useState(duration[0]);
  const { restBetweenSets, restAfterSetComplete, sets } = Exercise;
  console.log(duration.filter(Boolean).length);
  const [restCount, setrestCount] = useState(0);
  const [minutes, setMinutes] = useState(restBetweenSets);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [previousWorkout, setPreviousWorkout] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const w = currentDayWorkouts.find(
      (workout) => workout.exerciseName === duration[0].exerciseName
    );

    if (w) {
      console.log(w);
      setExercise(w);
      setMinutes(w.restBetweenSets);
      setrestCount(0);
    } else if (previousWorkout) {
      navigate("/");
    }
  }, [exerciseName]);
  useEffect(() => {
    // if (isRunning) {
    //   getRestCount(restCount);
    //   console.log(restCount);

    console.log(sets);
    if (Number(restCount) === Number(sets - 1)) {
      setMinutes(Number(restAfterSetComplete));
    } else {
      setMinutes(restBetweenSets);
    }
    console.log(previousWorkout);

    getRestCount(restCount);
  }, [restCount]);

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
          setrestCount((prev) => prev + 1);
          setIsRunning(false);
          clearInterval(interval);
          setPreviousWorkout(Exercise.exerciseName);
          console.log(previousWorkout);
        }
      }, 1000);
    } else if (!isRunning && minutes !== restBetweenSets) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  function handleStart() {
    setIsRunning(true);
  }

  //   function handleStop() {
  //     setIsRunning(false);
  //   }

  //   function handleReset() {
  //     setMinutes(duration);
  //     setSeconds(0);
  //   }

  return (
    <>
      {currentWorkout ? (
        <div className="w-full bg-gray-700 text-white p-6 left-0 absolute lg:bottom-0 bottom-12 flex justify-between items-center max-h-20">
          <div
            className={`${
              isRunning
                ? "w-full flex justify-center items-center text-2xl"
                : ""
            }`}
          >
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>

          {!isRunning && <Button click={handleStart}>Rest</Button>}
          {/* {isRunning && <button onClick={handleStop}>Stop</button>}
      <button onClick={handleReset}>Reset</button> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default RestTimer;
