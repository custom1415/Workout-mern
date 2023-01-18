import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectEditValues,
  selectisModalOpen,
  selectToaster,
  selectWorkoutList,
  setWorkoutToBeDone,
} from "../../redux/workout/workout";
import { EditModal } from "../edit-modal/editModal";
import Toast from "../toast/Toast";
import FolderList from "./folder-list";
import WorkoutListHeader from "./workout-list-header";
import { FolderListContent } from "./folder-list-content";
const WorkoutList = () => {
  const { visibility, success, message } = useSelector(selectToaster);
  const editValues = useSelector(selectEditValues);

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

  const isModalOpen = useSelector(selectisModalOpen)
  return (
    <section
      className={`flex flex-col bg-gray-900  w-full  h-screen overflow-y-scroll `}
    >
      <Toast visible={visibility} success={success} message={message} />
      {isModalOpen ? <EditModal oldWorkout={editValues} /> : null}
      <WorkoutListHeader />
      <div className="accordion flex flex-col gap-2 py-4" id="parentAcc">
        {Object.keys(workoutList).length ? (
          Object.keys(workoutList).map((singleFolder, ix) => {
            // const length = Object.values(workoutList[singleFolder]).length;

            return (
              <Fragment key={singleFolder}>
                <FolderList ix={ix} singleFolder={singleFolder}>
                  <FolderListContent
                    handleClick={handleClick}
                    singleFolder={singleFolder}
                    workoutList={workoutList}
                  />
                </FolderList>
              </Fragment>
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
