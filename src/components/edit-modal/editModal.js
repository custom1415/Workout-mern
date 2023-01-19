import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectEditValues,
  confirmEdit,
  activateToaster,
  selectisModalOpen,
  closeModal,
} from "../../redux/workout/workout";

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
          <div className="modal-content  border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className=" modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                // id="exampleModalCenteredScrollableLabel"
              >
                Edit workout
              </h5>
              <button
                type="button"
                onClick={() => dispatch(closeModal())}
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              ></button>
            </div>
            <div className="overflow-y-scroll">
              <div className=" relative p-4 flex flex-col justify-center gap-4">
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
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => dispatch(closeModal())}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEditValues}
                  type="button"
                  className="inline-block px-6 py-2.5 bg-gray-900 text-primary font-medium text-xs leading-tight uppercase rounded shadow-md hover:brightness-50 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
