import { WorkoutList } from "../components/Workout List/workoutList";
import { Form } from "../components/WorkoutForm/Workoutform";

export const CreateWorkoutPage = () => {
  return (
    <section className="flex justify-between w-screen ">
    
        <Form />
 

      <WorkoutList />
    </section>
  );
};
