import React, { useState } from "react";

import TimerControls from "./timer-controls";
import { Indicators } from "./timer-indicators";

import { TimerFunctions } from "./timer-functions";

export const TimerComponent = ({ reset }) => {
  const {
    handleStart,
    handleReset,
    handlePauseResume,
    isActive,
    isPaused,
    time,
  } = TimerFunctions(reset);
  // const buttons = ["Start", "Stop", "Reset", "Rest"];

  return (
    <section className="lg:w-1/2 sm:w-[70%] midsm:w-[85%] w-screen bg-black midsm:h-1/4 h-[20%] mx-auto flex justify-center items-center flex-col">
      <Indicators time={time} />
      <TimerControls
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleStart={handleStart}
        isActive={isActive}
        isPaused={isPaused}
      />
    </section>
  );
};
