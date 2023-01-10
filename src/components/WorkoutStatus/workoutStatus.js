import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  resetRest,
  selectCurrentDayWorkouts,
  selectCurrentIndex,
  selectRestCount,
  setRestBtnVisibility,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";
import RestTimer from "../rest-timer/restTimer";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
import { WorkoutFooter } from "../workoutFooter/workoutFooter";
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
  useEffect(() => {
    // setProgress(percent.toFixed());
    if (currentWorkout.filter(Boolean).length) {
      const { restBetweenSets, sets, restAfterSetComplete } = currentWorkout[0];

      if (restsCompleted === Number(sets)) {
        // console.log(currentWorkout[0]);
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
    if (restsCompleted >= 1 || workoutsCompleted>=1) {
      timeout = setTimeout(() => {
        dispatch(setRestBtnVisibility(true));
      }, 30000);
    }
    return ()=> clearTimeout(timeout)
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
  window.addEventListener("resize", Check);
  return (
    <>
      <div className="lg:grid lg:grid-cols-3  lg:gap-5 gap-2 mt-6 h-[72vh] relative  ">
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
          <h1 className="text-gray-800   text-center mt-3 text-3xl group-hover:text-primary ">
            Previous Workouts
          </h1>
          {previousWorkouts.filter(Boolean).length
            ? previousWorkouts.map((workout, i) => {
                const {
                  exerciseName,
                  reps,
                  sets,
                  restBetweenSets,
                  restAfterSetComplete,
                } = workout;
                return (
                  <WorkoutCard
                    key={i}
                    exerciseName={exerciseName}
                    reps={reps}
                    sets={sets}
                    restAfterSetComplete={restAfterSetComplete}
                    restBetweenSets={restBetweenSets}
                  />
                );
              })
            : null}
        </div>
        <div
          className={`bg-[#09061b] lg:w-full md:w-1/2 h-full midsm:w-4/5 w-full px-3 pb-6  overflow-y-scroll lg:static absolute  lg:translate-x-0 translate-x-[-50%] left-[50%] 
          
          
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
          {currentWorkout.filter(Boolean).length ? (
            currentWorkout.map((workout, i) => {
              const {
                exerciseName,
                reps,
                sets,
                restBetweenSets,
                restAfterSetComplete,
              } = workout;
              return (
                <WorkoutCard
                  key={i}
                  exerciseName={exerciseName || ""}
                  reps={reps || 0}
                  sets={sets || 0}
                  restAfterSetComplete={restAfterSetComplete || 0}
                  restBetweenSets={restBetweenSets || 0}
                />
              );
            })
          ) : (
            <></>
          )}
          <p className="text-gray-500 mt-3">
            Workouts completed : {workoutsCompleted}
          </p>
          <p className="text-gray-500 mt-3  ">Workouts left : {workoutsLeft}</p>
          <p className="text-gray-500 mt-3">
            Current Set : {restsCompleted + 1}
          </p>
          <p className="text-gray-500 mt-3  ">Rests Taken : {restsCompleted}</p>

          <RestTimer
            currentDayWorkouts={currentDayWorkouts}
            shouldReset={shouldReset}
            currentWorkout={currentWorkout.filter(Boolean).length}
            duration={
              currentWorkout.filter(Boolean).length
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

          <div className="w-full group/progress bg-gray-600 h-3 relative mt-4">
            <div
              className="bg-primary h-3  transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div
                className={`${
                  previousWorkouts.length ? "block" : "hidden"
                }   top-3 relative bg-gray-600 left-0 px-3 py-2 text-white`}
              >
                {(
                  (previousWorkouts.length / currentDayWorkouts.length) *
                  100
                ).toFixed() + "% complete"}
              </div>
            </div>
          </div>
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
          {nextWorkouts.length
            ? nextWorkouts.map((workout, i) => {
                const {
                  exerciseName,
                  reps,
                  sets,
                  restBetweenSets,
                  restAfterSetComplete,
                } = workout;
                return (
                  <WorkoutCard
                    key={i}
                    exerciseName={exerciseName}
                    reps={reps}
                    sets={sets}
                    restAfterSetComplete={restAfterSetComplete}
                    restBetweenSets={restBetweenSets}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};
