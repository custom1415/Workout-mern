import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectWorkoutToBeDone,
  setCurrentDayWorkouts,
} from "../../redux/workout/workout";

export const WorkoutOrder = () => {
  const workout = useSelector(selectWorkoutToBeDone);
  const [items, setItems] = useState(workout);
  const { day, list } = items;
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(false);

  const check = () => {
    if (!list.length) {
      setisDisabled(true);
      // return navigate("/create");
    }
  };
  useEffect(() => {
    check();
  }, [isDisabled]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = [...list];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems({
      day,
      list: newItems,
    });
  };
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentDayWorkouts(list));
    navigate("/workout");
  };
  return (
    <div
      className="modal fade fixed top-0 left-0 block w-full h-full outline-none overflow-x-hidden overflow-y-auto show bg-gray-900 "
      id="workoutOrder"
      tabIndex="-1"
      aria-labelledby="workout"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-[#0b0220] bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="md:text-xl text-md font-medium leading-normal text-primary"
              id="workout"
            >
              <span className="text-gray-600 whitespace-nowrap">
                Order your Workout -{" "}
              </span>
              {day || ""}
            </h5>

            <button
              className={`py-2 supersm:px-3 px-2 lg:text-xl  md:text-md text-sm whitespace-nowrap  rounded-sm cursor-pointer text-gray-900  bg-primary hover:scale-[1.05] transition-all ${
                isDisabled ? "hidden" : ""
              }`}
              onClick={handleClick}
            >
              Start <span className="supersm:inline-block hidden">Workout</span>
            </button>
          </div>
          <div className="modal-body p-4  md:text-md text-sm">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {list.length ? (
                      list.map((item, index) => (
                        <Draggable
                          key={item.exerciseName}
                          draggableId={item.exerciseName}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="relative w-full bg-gray-900  text-gray-600 p-4 my-4 flex justify-between items-center"
                            >
                              <p className="text-primary relative sm:left-0 left-10 sm:max-w-none max-w-[30%] overflow-hidden">
                                {item.exerciseName}
                              </p>
                              <div className="flex">
                                <p className=" ">
                                  <span className="">Sets -</span>{" "}
                                  <span className="text-primary">
                                    {item.sets}
                                  </span>
                                </p>
                                <p className=" sm:ml-9 ml-5">
                                  <span className="">Reps -</span>{" "}
                                  <span className="text-primary">
                                    {item.reps}
                                  </span>
                                </p>
                              </div>
                              <p className="text-primary absolute top-1/2 -translate-y-1/2 md:-left-24 left-2 sm:-left-20 sm:w-12 w-8 sm:h-12 h-8 text-center grid place-content-center pointer-events-none  bg-[#0b0220]  ">
                                {index + 1}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <h1 className="text-white text-center">Empty List</h1>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};
