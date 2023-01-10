import { Button } from "../Button/button";

export default function TimerControls({
  handleReset,
  handleStart,
  handlePauseResume,
  isActive,
  isPaused,
}) {
  return (
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
  );
}
