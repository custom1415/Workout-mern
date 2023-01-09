import { TimerComponent } from "../../components/Timer/Timer";
import { WorkoutStatus } from "../../components/WorkoutStatus/workoutStatus";
import { useState } from "react";
import { WorkoutFooter } from "../../components/workoutFooter/workoutFooter";
export const WorkoutPage = () => {
  const [Time, setTime] = useState(0);

  const getTime = (time) => {
    console.log("called");
    setTime(time);
  };
  return (
    <section className="midsm:px-6 bg-gray-900 overflow-hidden h-screen ">
      {/* <Button isFloatingBtn>
        <MdAdd />
      </Button> */}
      <TimerComponent getTime={getTime} />
      <WorkoutStatus time={Time} />

      <div className="lg:hidden">
        <WorkoutFooter />
      </div>
    </section>
  );
};
