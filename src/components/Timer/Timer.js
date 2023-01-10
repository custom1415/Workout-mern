import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setRestBtnVisibility,
  resetRest,
  selectRestButtonVisibility,
} from "../../redux/workout/workout";

import { Button } from "../Button/button";

export const TimerComponent = ({ reset }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  // const buttons = ["Start", "Stop", "Reset", "Rest"];
  const dispatch = useDispatch();
  React.useEffect(() => {
    let interval = null;

    let timeout;

    if (isActive && isPaused === false) {
      timeout = setTimeout(() => {
        dispatch(setRestBtnVisibility(true));
      }, 30000);

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

  return (
    <section className="lg:w-1/2 sm:w-[70%] midsm:w-[85%] w-screen bg-black h-1/4 mx-auto flex justify-center items-center flex-col">
      <section className="grid grid-cols-7 w-[80%] place-content-center place-items-center">
        <span className="supersm:text-5xl text-[42px] text-white">
          {("0" + Math.floor(time / 3600000)).slice(-2)}
        </span>

        <span className="supersm:text-5xl text-[42px] text-white">:</span>

        <span className="supersm:text-5xl text-[42px] text-white">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
        </span>

        <span className="supersm:text-5xl text-[42px] text-white">:</span>

        <span className="supersm:text-5xl text-[42px] text-white">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>

        <span className="supersm:text-5xl text-[42px] text-white">:</span>

        <span className="supersm:text-5xl text-[42px] text-white">
          {" "}
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </section>
      <section className="max-w-[80%]  mt-6 flex justify-center items-center lg:gap-10 supersm:gap-8 gap-4">
        {!isActive && (
          <Button
            style={{
              width: "33.3333%",
              display: "grid",
              placeContent: "center",
            }}
            click={handleStart}
          >
            Start
          </Button>
        )}

        <Button
          style={{ width: "33.3333%", display: "grid", placeContent: "center" }}
          click={handlePauseResume}
        >
          {isPaused && isActive ? "Resume" : "Pause"}
        </Button>
        <Button
          style={{ width: "33.3333%", display: "grid", placeContent: "center" }}
          click={handleReset}
        >
          Reset
        </Button>
        {/* <Button
          style={{ width: "20%", display: "grid", placeContent: "center" }}
          click={handleRest}
        >
          Rest
        </Button> */}
      </section>
    </section>
  );
};
