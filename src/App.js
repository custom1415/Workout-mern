import logo from "./logo.svg";
import "./App.css";
import { WorkoutPage } from "./pages/Workout/Workout";
import { Routes, Route } from "react-router-dom";
import { CreateWorkoutPage } from "./pages/createWorkoutPage";
import { WorkoutOrder } from "./pages/Workout-order/workoutOrder";
import WorkoutList from "./components/Workout List/workoutList";
import { WorkoutComplete } from "./pages/workoutComplete";

function App() {
  return (
    <Routes>
      <Route path="/workout" element={<WorkoutPage />} />

      <Route path="/" element={<CreateWorkoutPage />} />
      <Route path="/workoutlist" element={<WorkoutList />} />
      <Route path="/workoutOrder" element={<WorkoutOrder />} />
      <Route path="/complete" element={<WorkoutComplete />} />
    </Routes>
  );
}

export default App;
