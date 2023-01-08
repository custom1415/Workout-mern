import { TimerComponent } from "../../components/Timer/Timer";
import { WorkoutStatus } from "../../components/WorkoutStatus/workoutStatus";
import { useState } from "react";
import { WorkoutFooter } from "../../components/workoutFooter/workoutFooter";
export const WorkoutPage = () => {
  const [Time, setTime] = useState(0);
  const [RestStatus, setRestStatus] = useState(false);
  const getRestStatus = (status) => {
    setRestStatus(status);
  };
  const getTime = (time) => {
    console.log("called");
    setTime(time);
  };
  return (
    <section className="midsm:px-6 bg-gray-900 overflow-hidden h-screen ">
      {/* <Button isFloatingBtn>
        <MdAdd />
      </Button> */}
      <TimerComponent getTime={getTime} getRestStatus={getRestStatus} />
      <WorkoutStatus time={Time} restStatus={RestStatus} />

      <div className="lg:hidden">
        <WorkoutFooter />
      </div>
    </section>
  );
};