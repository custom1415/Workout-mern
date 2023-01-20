import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaChevronLeft, FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/button";
import {
  selectWorkoutToBeDone,
  setCurrentDayWorkouts,
} from "../../redux/workout/workout";
import { NavBtns } from "./nav-btns";

export const WorkoutOrder = () => {
  const workout = useSelector(selectWorkoutToBeDone);
  const [items, setItems] = useState(workout);
  const { day, list } = items;
  const navigate = useNavigate();

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

  return (
    <div
      className="fixed top-0 left-0 block w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900 outline-none modal fade show "
      id="workoutOrder"
      tabIndex="-1"
      aria-labelledby="workout"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-auto pointer-events-none modal-dialog modal-lg">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-[#0b0220] bg-clip-padding rounded-md outline-none text-current">
          <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200 modal-header rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-primary"
              id="workout"
            >
              <span className="text-gray-600 whitespace-nowrap">
                Order your Workout -&nbsp;
              </span>
              {day || ""}
            </h5>
            <NavBtns list={list} day={day}/>
          </div>
          <div className="p-4 text-sm modal-body md:text-md">
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
                              className="relative flex items-center justify-between w-full p-4 my-4 text-gray-600 bg-gray-900"
                            >
                              <p className="text-primary relative sm:left-0 left-10 sm:max-w-none max-w-[30%] overflow-hidden">
                                {item.exerciseName}
                              </p>
                              <div className="flex">
                                <p className="">
                                  <span className="">Sets -</span>{" "}
                                  <span className="text-primary">
                                    {item.sets}
                                  </span>
                                </p>
                                <p className="ml-5 sm:ml-9">
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
                      <h1 className="text-center text-white">Empty List</h1>
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
