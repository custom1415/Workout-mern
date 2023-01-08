// import { Fragment } from "react";
// import { FaPlay } from "react-icons/fa";
// import { ImCross } from "react-icons/im";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   selectIsWorkoutListVisible,
//   selectWorkoutList,
//   setWorkoutToBeDone,
//   toggleWorkoutListVisibility,
// } from "../../redux/workout/workout";
// import { Button } from "../Button/button";
// import { WorkoutCard } from "../WorkoutCard/workoutCard";

// export const WorkoutList = () => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   const workoutList = useSelector(selectWorkoutList);
//   console.log(workoutList);
//   const handleClick = (singleFolder, folder) => {
//     console.log(singleFolder, folder);
//     console.log(workoutList[singleFolder][folder]);
//     dispatch(
//       setWorkoutToBeDone({
//         day: folder,
//         list: workoutList[singleFolder][folder],
//       })
//     );
//     navigate("/workoutOrder");
//   };

//   const isWorkoutListVisible = useSelector(selectIsWorkoutListVisible);
//   return (
//     <section
//       className={`flex flex-col bg-gray-900 lg:w-[60%] w-full lg:relative absolute top-0 left-0 h-screen overflow-y-scroll ${
//         isWorkoutListVisible ? "z-50" : "z-0"
//       }`}
//     >
//       <div className="lg:hidden shadow-black shadow-sm pt-8 pb-4 text-white  flex items-center justify-between px-6   relative -top-4  z-50 ">
//         <h1 className="text-3xl text-primary">Workout List</h1>
//         <span
//           className="inline-block px-3 py-2 bg-primary text-gray-900 rounded-sm cursor-pointer  hover:brightness-75 "
//           onClick={() =>
//             dispatch(toggleWorkoutListVisibility(!isWorkoutListVisible))
//           }
//         >
//           Create
//         </span>
//       </div>
//       <div className="accordion flex flex-col gap-2 py-4" id="parentAcc">
//         {Object.keys(workoutList).length ? (
//           Object.keys(workoutList).map((singleFolder, ix) => {
//             console.log(workoutList);
//             console.log(workoutList[singleFolder]);
//             const i = (Math.random() * Math.random()) / Math.random();
//             const collapseId = ix;
//             return (
//               <div
//                 className="accordion-item bg-gray-900 relative"
//                 id="parent"
//                 key={i}
//               >
//                 <div className="accordion-header relative">
//                   <Button
//                     create
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target={`#collapse${collapseId}`}
//                     aria-expanded="true"
//                     aria-controls="collapseOne"
//                   >
//                     {singleFolder}
//                   </Button>
//                 </div>

//                 <div
//                   id={`collapse${collapseId}`}
//                   className="accordion-collapse collapse"
//                   data-bs-parent="#parentAcc"
//                 >
//                   <div
//                     id="parentB"
//                     className={`accordion-body py-4 px-5 grid grid-cols-1 gap-2 accordion-collapse `}
//                   >
//                     {Object.entries(workoutList[singleFolder]).map(
//                       (singleSubFolder, ix2) => {
//                         console.log(singleFolder);
//                         const i =
//                           (Math.random() * Math.random()) / Math.random();
//                         const [folder, folderValue] = singleSubFolder;
//                         return (
//                           <div key={i}>
//                             <div>
//                               <Button
//                                 data-bs-toggle="collapse"
//                                 data-bs-target={`#${folder}`}
//                                 aria-expanded="false"
//                                 aria-controls="collapseOne"
//                                 create
//                               >
//                                 <div className=" group-hover/btn:scale-125 transition-all">
//                                   {folder}
//                                 </div>

//                                 <div
//                                   onClick={handleClick.bind(
//                                     null,
//                                     singleFolder,
//                                     folder
//                                   )}
//                                   className="group absolute top-1/2 -translate-y-1/2 right-0 w-1/4 grid place-items-center rounded-sm text-gray-900 bg-primary h-full p-2"
//                                 >
//                                   <FaPlay className="scale-110 group-hover:scale-150 transition-all " />
//                                 </div>
//                                 <div className="absolute top-1/2 -translate-y-1/2  text-white w-8 rounded-sm  h-full grid place-items-center left-0 bg-blue-500">
//                                   {folderValue.length}
//                                 </div>
//                               </Button>

//                               <div className="w-full grid supersm:grid-cols-2 grid-cols-1 gap-4 place-items-center place-content-center transition-all">
//                                 {folderValue.map((workout) => {
//                                   console.log(workout);
//                                   const {
//                                     exerciseName,
//                                     reps,
//                                     sets,
//                                     restBetweenSets,
//                                     restAfterSetComplete,
//                                   } = workout;
//                                   const i =
//                                     (Math.random() * Math.random()) /
//                                     Math.random();
//                                   return (
//                                     <div
//                                       key={i}
//                                       id={folder}
//                                       className=" collapse w-full transition-all"
//                                       data-bs-parent="#parentB"
//                                     >
//                                       {/* {workout.exerciseName} */}
//                                       <WorkoutCard
//                                         exerciseName={exerciseName}
//                                         reps={reps}
//                                         sets={sets}
//                                         restAfterSetComplete={
//                                           restAfterSetComplete
//                                         }
//                                         restBetweenSets={restBetweenSets}
//                                       />
//                                     </div>
//                                   );
//                                 })}
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       }
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <h1 className="text-center  mt-2 text-white text-3xl">
//             Workout List is Empty
//           </h1>
//         )}
//       </div>
//     </section>
//   );
// };
import { Fragment } from "react";
import { FaPlay } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectIsWorkoutListVisible,
  selectWorkoutList,
  setWorkoutToBeDone,
  toggleWorkoutListVisibility,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";
import { WorkoutCard } from "../WorkoutCard/workoutCard";

export const WorkoutList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const workoutList = useSelector(selectWorkoutList);
  console.log(workoutList);
  const handleClick = (singleFolder, folder) => {
    console.log(singleFolder, folder);
    console.log(workoutList[singleFolder][folder]);
    dispatch(
      setWorkoutToBeDone({
        day: folder,
        list: workoutList[singleFolder][folder],
      })
    );
    navigate("/workoutOrder");
  };

  const isWorkoutListVisible = useSelector(selectIsWorkoutListVisible);
  return (
    <section
      className={`flex flex-col bg-gray-900  w-full  absolute top-0 left-0 h-screen overflow-y-scroll ${
        isWorkoutListVisible ? "z-50" : "z-0"
      }`}
    >
      <div className=" shadow-black shadow-sm pt-8 pb-4 text-white  flex items-center justify-between px-6   relative -top-4  z-50 ">
        <h1 className="text-3xl text-primary">Workout List</h1>
        <span
          className="inline-block px-3 py-2 bg-primary text-gray-900 rounded-sm cursor-pointer  hover:brightness-75 "
          onClick={() =>
            dispatch(toggleWorkoutListVisibility(!isWorkoutListVisible))
          }
        >
          Create
        </span>
      </div>
      <div className="accordion flex flex-col gap-2 py-4" id="parentAcc">
        {Object.keys(workoutList).length ? (
          Object.keys(workoutList).map((singleFolder, ix) => {
            console.log(workoutList);
            console.log(workoutList[singleFolder]);
            const i = (Math.random() * Math.random()) / Math.random();
            const collapseId = ix;
            return (
              <div
                className="accordion-item bg-gray-900 relative"
                id="parent"
                key={i}
              >
                <div className="accordion-header relative">
                  <Button
                    create
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${collapseId}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    {singleFolder}
                  </Button>
                </div>

                <div
                  id={`collapse${collapseId}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#parentAcc"
                >
                  <div
                    id="parentB"
                    className={`accordion-body py-4 px-5 grid grid-cols-1 gap-2 accordion-collapse `}
                  >
                    {Object.entries(workoutList[singleFolder]).map(
                      (singleSubFolder, ix2) => {
                        console.log(singleFolder);
                        const i =
                          (Math.random() * Math.random()) / Math.random();
                        const [folder, folderValue] = singleSubFolder;
                        return (
                          <div key={i}>
                            <div>
                              <Button
                                data-bs-toggle="collapse"
                                data-bs-target={`#${folder}`}
                                aria-expanded="false"
                                aria-controls="collapseOne"
                                create
                              >
                                <div className=" group-hover/btn:scale-125 transition-all">
                                  {folder}
                                </div>

                                <div
                                  onClick={handleClick.bind(
                                    null,
                                    singleFolder,
                                    folder
                                  )}
                                  className="group absolute top-1/2 -translate-y-1/2 right-0 w-1/6 grid place-items-center rounded-sm text-gray-900 bg-primary h-full p-2"
                                >
                                  <FaPlay className="scale-110 group-hover:scale-150 transition-all " />
                                </div>
                                <div className="absolute top-1/2 -translate-y-1/2  text-white w-8 rounded-sm  h-full grid place-items-center left-0 bg-blue-500">
                                  {folderValue.length}
                                </div>
                              </Button>

                              <div className="w-full grid lg:grid-cols-3 midsm:grid-cols-2 grid-cols-1 gap-4 place-items-center place-content-center transition-all">
                                {folderValue.map((workout) => {
                                  console.log(workout);
                                  const {
                                    exerciseName,
                                    reps,
                                    sets,
                                    restBetweenSets,
                                    restAfterSetComplete,
                                  } = workout;
                                  const i =
                                    (Math.random() * Math.random()) /
                                    Math.random();
                                  return (
                                    <div
                                      key={i}
                                      id={folder}
                                      className=" collapse w-full transition-all"
                                      data-bs-parent="#parentB"
                                    >
                                      {/* {workout.exerciseName} */}
                                      <WorkoutCard
                                        exerciseName={exerciseName}
                                        reps={reps}
                                        sets={sets}
                                        restAfterSetComplete={
                                          restAfterSetComplete
                                        }
                                        restBetweenSets={restBetweenSets}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center  mt-2 text-white text-3xl">
            Workout List is Empty
          </h1>
        )}
      </div>
    </section>
  );
};
