// import { useRef } from "react";
// import { FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
// import { Button } from "../Button/button";
// import { WorkoutCard } from "../WorkoutCard/workoutCard";

// export const WorkoutStatus = () => {
//   const currentWorkoutRef = useRef();
//   const previousWorkoutRef = useRef();
//   const nextWorkoutRef = useRef();
//   const handleScroll = (e) => {
//     if (e.target.dataset.name === "current") {
//       currentWorkoutRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//     if (e.target.dataset.name === "next") {
//       nextWorkoutRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//     if (e.target.dataset.name === "previous") {
//       previousWorkoutRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <div className="lg:grid lg:grid-cols-3  lg:gap-5 gap-2 mt-6 h-[72vh] relative  ">
//         <Button isCarouselBtn left>
//           <FaChevronLeft />
//         </Button>
//         <Button isCarouselBtn right>
//           <FaChevronRight />
//         </Button>

//         <div className="bg-black px-3 pb-6 lg:w-full w-1/2 overflow-y-scroll lg:relative absolute  lg:translate-x-0 translate-x-[-1000px] group">
//           <h1
//             className="text-gray-800   text-center mt-3 lg:text-3xl text-2xl group-hover:text-primary "
//             ref={previousWorkoutRef}
//           >
//             Previous Workouts
//           </h1>

//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />

//           <Button data-name="previous" isUpBtn right="12" click={handleScroll}>
//             <FaChevronUp data-name="previous" />
//           </Button>
//         </div>
//         <div className="bg-black lg:w-full w-1/2 px-3 pb-6  overflow-y-scroll lg:static absolute left-[50%] lg:translate-x-0 translate-x-[-50%] group">
//           <h1
//             className="text-gray-800 group-hover:text-primary  text-center mt-3 text-3xl"
//             ref={currentWorkoutRef}
//           >
//             Current Workout
//           </h1>
//           <WorkoutCard />
//           <WorkoutCard />

//           <Button isUpBtn data-name="current" click={handleScroll}>
//             <FaChevronUp data-name="current" />
//           </Button>
//         </div>
//         <div className="bg-black lg:w-full w-1/2 px-3 pb-6 lg:translate-x-0 translate-x-[-1000px] overflow-y-scroll lg:relative absolute group">
//           <h1
//             className="text-gray-800   text-center mt-3 text-3xl group-hover:text-primary "
//             ref={nextWorkoutRef}
//           >
//             Next Workouts
//           </h1>
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />
//           <WorkoutCard />

//           <Button data-name="next" isUpBtn right="12" click={handleScroll}>
//             <FaChevronUp data-name="next" />
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

import { memo, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  selectCurrentDayWorkouts,
  selectCurrentIndex,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";
import RestTimer from "../rest-timer/restTimer";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
import { WorkoutFooter } from "../workoutFooter/workoutFooter";
export const WorkoutStatus = ({ time, restStatus }) => {
  console.log(time);

  const [progress, setProgress] = useState(0);
  const [shouldCarousel, setShouldCarousel] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [restsCompleted, setRestsCompleted] = useState(0);

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
  const getRestCount = (val) => {
    setRestsCompleted(val);
  };
  // useEffect(() => {
  //   console.log(currentWorkout, nextWorkouts, previousWorkouts);
  //   // let interval;
  //   // if (currentWorkout.length >= 1) {
  //   //   setPreviousWorkouts((previous) => [currentWorkout[0], ...previous]);

  //   //   setCurrentWorkout([nextWorkouts[0] || null]);
  //   //   if (nextWorkouts.length) {
  //   //     setNextWorkouts(nextWorkouts.splice(1));
  //   //   }
  //   // }

  //   // return () => clearInterval(interval);
  // }, [nextWorkouts]);
  useEffect(() => {
    console.log("hi");
    // if (!time) {
    //   setCurrentWorkout([currentDayWorkouts[0] || null]);

    //   setNextWorkouts([...currentDayWorkouts.slice(1)]);
    //   setPreviousWorkouts([]);
    //   setProgress(0);
    // }
    if (currentWorkout.filter(Boolean).length) {
      const { restBetweenSets, sets, restAfterSetComplete } = currentWorkout[0];

      const percent =
        (previousWorkouts.length / currentDayWorkouts.length) * 100;
      setProgress(percent.toFixed());
      console.log(restsCompleted, Number(sets));
      if (restsCompleted == Number(sets)) {
        console.log("kk");
        // console.log(currentWorkout[0]);
        setProgress(0);
        setWorkoutsCompleted(currentDayWorkouts.length - nextWorkouts.length);
        setWorkoutsLeft(nextWorkouts.length);

        if (currentWorkout.length >= 1) {
          setPreviousWorkouts((previous) => [currentWorkout[0], ...previous]);

          setCurrentWorkout([nextWorkouts[0] || null]);
          setRestsCompleted(0);
          if (nextWorkouts.length) {
            setNextWorkouts(nextWorkouts.splice(1));
          }
        }
      }
    }
  }, [time, restsCompleted]);
  // console.log(currentDayWorkouts);
  const currentWorkoutRef = useRef();
  const previousWorkoutRef = useRef();
  const nextWorkoutRef = useRef();
  const handleScroll = (e) => {
    if (e.target.dataset.name === "current") {
      currentWorkoutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (e.target.dataset.name === "next") {
      nextWorkoutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (e.target.dataset.name === "previous") {
      previousWorkoutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <h1
            className="text-gray-800   text-center mt-3 text-3xl group-hover:text-primary "
            ref={previousWorkoutRef}
          >
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

          {/* <Button
            data-name="previous"
            isUpBtn="true"
            right="12"
            click={handleScroll}
          >
            <FaChevronUp data-name="previous" />
          </Button> */}
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
          <h1
            className="text-primary group-hover:text-primary  text-center mt-3 text-3xl "
            ref={currentWorkoutRef}
          >
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

          <RestTimer
            currentDayWorkouts={currentDayWorkouts}
            getRestCount={getRestCount}
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

          <div className="w-full group/progress bg-gray-600 h-3 relative mt-9">
            <div
              className="bg-primary h-3  transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div
                className={`${
                  previousWorkouts.length ? "block" : "hidden"
                }   top-3 relative bg-gray-600 left-0 px-3 py-2 text-white`}
              >
                {(previousWorkouts.length / currentDayWorkouts.length) * 100 +
                  "% complete"}
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
          <h1
            className="text-gray-800   text-center mt-3 text-3xl group-hover:text-primary "
            ref={nextWorkoutRef}
          >
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

          {/* <Button
            data-name="next"
            isUpBtn
            right="12"
            click={handleScroll}
            style={{ position: "sticky" }}
          >
            <FaChevronUp data-name="next" />
          </Button> */}
        </div>
      </div>
    </>
  );
};
