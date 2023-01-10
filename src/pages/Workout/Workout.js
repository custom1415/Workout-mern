import { TimerComponent } from "../../components/Timer/Timer";
import { WorkoutStatus } from "../../components/WorkoutStatus/workoutStatus";
import { useEffect, useState } from "react";
import { WorkoutFooter } from "../../components/workoutFooter/workoutFooter";
export const WorkoutPage = () => {
  const [shouldReset, setShouldReset] = useState(false);
  useEffect(() => {
    if (shouldReset) {
      setShouldReset(false);
    }
  }, [shouldReset]);

  const resetWorkout = () => {
    setShouldReset(true);
    return shouldReset;
  };
  return (
    <section className="midsm:px-6 bg-gray-900 overflow-hidden h-screen ">
      {/* <Button isFloatingBtn>
        <MdAdd />
      </Button> */}
      <TimerComponent reset={resetWorkout} />
      <WorkoutStatus  shouldReset={shouldReset} />

      <div className="lg:hidden">
        <WorkoutFooter />
      </div>
    </section>
  );
};
