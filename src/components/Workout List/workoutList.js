import { memo, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectToaster,
  selectWorkoutList,
  setToasterVisibility,
  setWorkoutToBeDone,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";
import Toast from "../toast/Toast";
import { WorkoutCard } from "../WorkoutCard/workoutCard";
const WorkoutList = () => {
  const { visibility, success, message } = useSelector(selectToaster);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const workoutList = useSelector(selectWorkoutList);
  const handleClick = (singleFolder, folder) => {
    dispatch(
      setWorkoutToBeDone({
        day: folder,
        list: workoutList[singleFolder][folder],
      })
    );
    navigate("/workoutOrder");
  };

  return (
    <section
      className={`flex flex-col bg-gray-900  w-full  h-screen overflow-y-scroll `}
    >
      <Toast visible={visibility} success={success} message={message} />

      <div className=" shadow-black shadow-sm pt-8 pb-4 text-white  flex items-center justify-between px-6   relative -top-4  z-50 ">
        <h1 className="midsm:text-3xl text-2xl text-primary">Workout List</h1>
        <span
          className="inline-block px-3 py-2 bg-primary text-gray-900 rounded-sm cursor-pointer  hover:brightness-75 "
          onClick={() => navigate("/")}
        >
          Create
        </span>
      </div>
      <div className="accordion flex flex-col gap-2 py-4" id="parentAcc">
        {Object.keys(workoutList).length ? (
          Object.keys(workoutList).map((singleFolder, ix) => {
            console.log(workoutList);
            console.log(workoutList[singleFolder]);

            const singleFoldere = ix;

            return (
              <div
                className="accordion-item bg-gray-900 relative"
                id="parent"
                key={singleFolder}
              >
                <div className="accordion-header relative">
                  <Button
                    create
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${singleFoldere}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    {singleFolder}
                  </Button>
                </div>

                <div
                  id={`collapse${singleFoldere}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#parentAcc"
                >
                  <div
                    id="parentB"
                    className={`accordion-body py-4 px-5 grid grid-cols-1 gap-2 accordion-collapse `}
                  >
                    {Object.entries(workoutList[singleFolder]).map(
                      (singleSubFolder, ix2) => {
                        const [folder, folderValue] = singleSubFolder;

                        if (!folderValue.length) return;
                        return (
                          <div key={folder}>
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
                                <div className="absolute top-1/2 -translate-y-1/2  text-white w-8 rounded-sm  h-full grid place-items-center left-0 bg-blue-700">
                                  {folderValue.length}
                                </div>
                              </Button>

                              <div className="w-full grid lg:grid-cols-3 midsm:grid-cols-2 grid-cols-1 gap-4 place-items-center place-content-center transition-all">
                                {folderValue.map((workout) => {
                                  const {
                                    exerciseName,
                                    reps,
                                    sets,
                                    restBetweenSets,
                                    restAfterSetComplete,
                                    note,
                                    id,
                                  } = workout;

                                  return (
                                    <div
                                      key={id}
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
                                        note={note}
                                        singleFolder={singleFolder}
                                        singleSubFolder={folder}
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
          <h1 className="text-center  mt-2 text-gray-500 supersm:text-3xl text-xl">
            Workout List is Empty
          </h1>
        )}
      </div>
    </section>
  );
};
export default WorkoutList;
