import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  resetRest,
  selectCurrentDayWorkouts,
  selectCurrentIndex,
  selectRestCount,
  selectToaster,
  setRestBtnVisibility,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";
import RestTimer from "../rest-timer/restTimer";
import Toast from "../toast/Toast";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
import { WorkoutFooter } from "../workoutFooter/workoutFooter";
import CurrentWorkouts from "./Current-Workouts";
import FooterCurrentWorkout from "./Footer-Current-Workout";
import NextWorkouts from "./Next-workouts";
import PreviousWorkouts from "./Previous-workouts";
import Progress from "./progress";
export const WorkoutStatus = ({ shouldReset }) => {
  const [shouldCarousel, setShouldCarousel] = useState(false);
  // const [restsCompleted, setRestsCompleted] = useState(0);

  const currentDayWorkouts = useSelector(selectCurrentDayWorkouts);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [workoutsLeft, setWorkoutsLeft] = useState(currentDayWorkouts.length);
  const [currentWorkout, setCurrentWorkout] = useState([
    currentDayWorkouts[0] || null,
  ]);

  const [nextWorkouts, setNextWorkouts] = useState([
    ...currentDayWorkouts.slice(1),
  ]);
  const [previousWorkouts, setPreviousWorkouts] = useState([]);

  const restsCompleted = useSelector(selectRestCount);
  const percent = (previousWorkouts.length / currentDayWorkouts.length) * 100;
  const [progress, setProgress] = useState(
    currentDayWorkouts.length && percent
  );
  const dispatch = useDispatch();
  const currentWorkoutLength = currentWorkout.filter(Boolean).length;
  useEffect(() => {
    // setProgress(percent.toFixed());
    if (currentWorkoutLength) {
      const { restBetweenSets, sets, restAfterSetComplete } = currentWorkout[0];

      if (restsCompleted === Number(sets)) {
        //
        // setProgress(0);
        setWorkoutsCompleted(currentDayWorkouts.length - nextWorkouts.length);
        setWorkoutsLeft(nextWorkouts.length);

        if (currentWorkout.length >= 1) {
          setPreviousWorkouts((previous) => [currentWorkout[0], ...previous]);
          dispatch(setRestBtnVisibility(true));

          setCurrentWorkout([nextWorkouts[0] || null]);
          // setRestsCompleted(0);
          //
          dispatch(resetRest());
          if (nextWorkouts.length) {
            setNextWorkouts(nextWorkouts.splice(1));
          }
        }
      }
    }
  }, [restsCompleted]);

  useEffect(() => {
    let timeout = null;
    if (restsCompleted >= 1 || workoutsCompleted >= 1) {
      timeout = setTimeout(() => {
        dispatch(setRestBtnVisibility(true));
      }, 30000);
    }
    return () => clearTimeout(timeout);
  }, [restsCompleted]);

  useEffect(() => {
    setProgress(percent);
  }, [workoutsCompleted]);

  const currentIndex = useSelector(selectCurrentIndex);

  const Check = () => {
    if (window.innerWidth <= 1024) {
      setShouldCarousel(true);
    } else {
      setShouldCarousel(false);
    }
  };
  useEffect(() => {
    Check();
  }, []);

  useEffect(() => {
    if (shouldReset) {
      setCurrentWorkout([currentDayWorkouts[0] || null]);

      setNextWorkouts([...currentDayWorkouts.slice(1)]);
      setPreviousWorkouts([]);
      setProgress(0);
    }
  }, [shouldReset]);
  const { visibility, success, message } = useSelector(selectToaster);
  window.addEventListener("resize", Check);

  return (
    <>
        <Toast visible={visibility} success={success} message={message} />
      <div className="lg:grid lg:grid-cols-3  lg:gap-5 gap-2 midsm:mt-6 midsm:h-[72vh] h-[80%] relative  ">
        <div
          className={`bg-[#09061b] lg:w-full md:w-1/2  midsm:w-4/5 w-full px-3 pb-6 lg:static absolute overflow-y-scroll h-full  lg:translate-x-0 translate-x-[-50%] left-[50%]

          ${
            !shouldCarousel
              ? "opacity-100"
              : shouldCarousel && currentIndex === 0
              ? "opacity-100 z-40"
              : "opacity-0 z-0"
          }  
          group transition ease-linear duration-300 `}
        >
          <PreviousWorkouts previousWorkouts={previousWorkouts} />
        </div>
        <div
          className={`bg-[#09061b] lg:w-full md:w-1/2 h-full midsm:w-4/5 w-full px-3 midsm:pb-6  overflow-y-scroll lg:static absolute  lg:translate-x-0 translate-x-[-50%] left-[50%] 
          
          
          ${
            !shouldCarousel
              ? "opacity-100"
              : shouldCarousel && currentIndex === 1
              ? "opacity-100 z-40"
              : "opacity-0 z-0"
          }
          
          group transition ease-linear duration-300`}
        >
          <h1 className="text-primary group-hover:text-primary  text-center mt-3 text-3xl ">
            Current Workout
          </h1>
          {currentWorkoutLength ? (
            <CurrentWorkouts currentWorkout={currentWorkout} />
          ) : (
            <></>
          )}
          <FooterCurrentWorkout
            restsCompleted={restsCompleted}
            workoutsCompleted={workoutsCompleted}
            workoutsLeft={workoutsLeft}
          />
          <RestTimer
            currentDayWorkouts={currentDayWorkouts}
            shouldReset={shouldReset}
            currentWorkout={currentWorkoutLength}
            currentExercise={
              currentWorkoutLength
                ? currentWorkout
                : [
                    {
                      restBetweenSets: 0,
                      restAfterSetComplete: 0,
                      sets: 0,
                      exerciseName: "default",
                    },
                  ]
            }
          />

          <Progress
            progress={progress}
            prevLength={previousWorkouts.length}
            curLength={currentDayWorkouts.length}
          />
        </div>
        <div
          className={`bg-[#09061b]  lg:w-full md:w-1/2  midsm:w-4/5 w-full px-3 pb-6 lg:static absolute overflow-y-scroll h-full  lg:translate-x-0 translate-x-[-50%] left-[50%]

          ${
            !shouldCarousel
              ? "opacity-100"
              : shouldCarousel && currentIndex === 2
              ? "opacity-100 z-40"
              : "opacity-0 z-0"
          }  
          group transition ease-linear duration-300`}
        >
          <h1 className="text-gray-800   text-center mt-3 text-3xl group-hover:text-primary ">
            Next Workouts
          </h1>
          <NextWorkouts nextWorkouts={nextWorkouts} />
        </div>
      </div>
    </>
  );
};
