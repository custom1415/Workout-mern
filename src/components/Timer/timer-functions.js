import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setRestBtnVisibility } from "../../redux/workout/workout";
export const TimerFunctions = (reset) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const dispatch = useDispatch();
  const toggleRestBtn = (bool) => dispatch(setRestBtnVisibility(true));
  useEffect(() => {
    let interval = null;

    let timeout;

    if (isActive && isPaused === false) {
      timeout = setTimeout(() => toggleRestBtn(true), 30000);

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
