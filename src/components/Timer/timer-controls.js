import { Button } from "../Button/button";

export default function TimerControls({
  handleReset,
  handleStart,
  handlePauseResume,
  isActive,
  isPaused,
}) {
  return (
    <section className="max-w-[80%]  midsm:mt-6 mt-2 flex justify-center items-center  lg:gap-10 supersm:gap-8 gap-4">
      {!isActive && <Button onClick={handleStart}>Start</Button>}

      <Button onClick={handlePauseResume}>
        {isPaused && isActive ? "Resume" : "Pause"}
      </Button>

      <Button
        className="btn-primary w-1/3 grid place-content-center "
        onClick={handleReset}
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
  );
}
