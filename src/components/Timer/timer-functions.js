import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectWorkoutCompleted,
  setRestBtnVisibility,
  totalTimeTaken,
} from "../../redux/workout/workout";
export const TimerFunctions = (reset) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const dispatch = useDispatch();
  const toggleRestBtn = (bool) => dispatch(setRestBtnVisibility(true));
  const workoutComplete = useSelector(selectWorkoutCompleted);
  const navigate = useNavigate();

  const checkCompletion = () => {
    if (workoutComplete) {
      dispatch(
        totalTimeTaken({
          mins: ("0" + Math.floor((time / 60000) % 60)).slice(-2),
          secs: ("0" + Math.floor((time / 1000) % 60)).slice(-2),
        })
      );
      navigate('/complete')
    }
  };
  useEffect(() => {
    checkCompletion();
  }, [workoutComplete]);

  useEffect(() => {
    let interval = null;

    let timeout;

    if (isActive && isPaused === false) {
      timeout = setTimeout(() => toggleRestBtn(true), 32000);

      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    reset();
    dispatch(setRestBtnVisibility(false));
  };

  return {
    handlePauseResume,
    handleReset,
    handleStart,
    time,
    isActive,
    isPaused,
  };
};
