import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  confirmEdit,
  activateToaster,
  closeModal,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";

export const EditModal = ({ oldWorkout }) => {
  const dispatch = useDispatch();
  const [FormField, setFormField] = useState(oldWorkout);
  const {
    exerciseName,
    reps,
    sets,
    restBetweenSets,
    restAfterSetComplete,
    note,
    singleFolder,
    singleSubFolder,
  } = FormField;

  const onChangeHandler = (e) => {
    setFormField({
      ...FormField,
      [e.target.name]: e.target.value,
    });
  };
  const confirmEditValues = () => {
    for (const key in FormField) {
      if (
        key !== "exerciseName" &&
        key !== "note" &&
        key !== "singleFolder" &&
        key !== "singleSubFolder"
      ) {
        if (Number(FormField[key]) === 0) {
          dispatch(activateToaster("Please provide valid values"));
          return;
        }
        if (/[-eE.]/.test(FormField[key])) {
          dispatch(activateToaster("Please provide valid values"));
          return;
        }
      }

      if (
        key !== "note" &&
        key !== "singleFolder" &&
        key !== "singleSubFolder"
      ) {
        if (!FormField[key]) {
          dispatch(activateToaster("Please fill in all the input fields"));
          return;
        }
      }
    }
    if (Number(FormField["sets"]) > 12) {
      dispatch(activateToaster("Exceeded maximum set limit 12"));
      return;
    }
    if (Number(FormField["reps"]) > 60) {
      dispatch(activateToaster("Exceeded maximum reps limit 60"));
      return;
    }
    if (Number(FormField["restBetweenSets"]) > 10) {
      dispatch(activateToaster("Exceeded maximum rest between sets limit 10"));
      return;
    }
    if (Number(FormField["restAfterSetComplete"]) > 10) {
      dispatch(
        activateToaster("Exceeded maximum rest after set complete limit 10")
      );
      return;
    }
    dispatch(
      confirmEdit({
        newWorkout: FormField,
        oldWorkout,
        mainFolder: singleFolder,
        subFolder: singleSubFolder,
      })
    );
  };

  return (
    <>
      <div
        onClick={() => dispatch(closeModal())}
        className={` z-[1000] show fade fixed top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto backdrop-blur-sm    }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none "
        >
          <div className="modal-content  border-none shadow-lg relative flex flex-col w-full pointer-events-auto  rounded-md outline-none text-current">
            <div className=" modal-header flex flex-shrink-0 items-center justify-between p-4 bg-gray-900">
              <h5
                className="text-xl font-medium leading-normal text-primary"
                // id="exampleModalCenteredScrollableLabel"
              >
                Edit workout
              </h5>
              <IoMdClose
                className="text-white scale-150 hover:scale-[1.75] transition-all cursor-pointer"
                onClick={() => dispatch(closeModal())}
              />
            </div>
            <div className="overflow-y-scroll">
              <div className=" relative p-4 flex flex-col justify-center gap-4   bg-white">
                <input
                  onChange={onChangeHandler}
                  value={exerciseName}
                  name="exerciseName"
                  placeholder="Exercise"
                  className="relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  onChange={onChangeHandler}
                  value={sets}
                  name="sets"
                  placeholder="Sets"
                  className="relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  onChange={onChangeHandler}
                  value={reps}
                  name="reps"
                  placeholder="Reps"
                  className="relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  onChange={onChangeHandler}
                  value={restBetweenSets}
                  name="restBetweenSets"
                  placeholder="Rest Between Sets"
                  className="relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  onChange={onChangeHandler}
                  value={restAfterSetComplete}
                  name="restAfterSetComplete"
                  placeholder="Rest After Set Complete"
                  className="relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />

                <textarea
                  name="note"
                  value={note}
                  onChange={onChangeHandler}
                  type="text"
                  rows="5"
                  required
                  className="relative block w-full px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-800 rounded appearance-none resize-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Note"
                />
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap gap-3 items-center justify-end p-4 bg-gray-900">
                <Button
                  type="button"
                  onClick={() => dispatch(closeModal())}
                  style={{ background: "#ef4444", color: "white" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmEditValues}


                  type="button"
                  style={{ background: "#1d4ed8", color: "white" }}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
