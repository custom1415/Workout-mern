import { useEffect, useState } from "react";
import { SelectFolder } from "../select-folder/selectFolder";
import { Button } from "../Button/button";
import { FormInput } from "../Forminput/forminput";
import { useDispatch } from "react-redux";
import {
  activateToaster,
  addFolderHandler,
  addWorkout,
  selectToaster,
  setToasterVisibility,
} from "../../redux/workout/workout";
import { AddFolderModal } from "../add-folder/addFolderModal";
import _ from "lodash";
import { useSelector } from "react-redux";
import Toast from "../toast/Toast";
import { useNavigate } from "react-router-dom";
export const Form = () => {
  const dispatch = useDispatch();

  const defaultFormFields = {
    exerciseName: "",
    sets: "",
    reps: "",
    restBetweenSets: "",
    restAfterSetComplete: "",
    note: "",
  };

  const [FormField, setFormField] = useState(defaultFormFields);
  const [folder, setFolder] = useState({
    mainFolder: "",
    subFolder: "",
  });
  const { mainFolder, subFolder } = folder;
  const {
    exerciseName,
    sets,
    reps,
    restAfterSetComplete,
    restBetweenSets,
    note,
  } = FormField;

  const getFolder = (mainFolder, subFolder) => {
    setFolder({
      mainFolder,
      subFolder,
    });
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormField({ ...FormField, [name]: value });
    //
  };
  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in FormField) {
      if (key !== "exerciseName" && key !== "note") {
        if (Number(FormField[key]) === 0) {
          dispatch(activateToaster("Please provide valid values"));
          return;
        }
        if (/[-eE.]/.test(FormField[key])) {
          dispatch(activateToaster("Please provide valid values"));
          return;
        }
      }

      if (key !== "note") {
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
    if (!mainFolder) {
      dispatch(activateToaster("Please choose a folder"));
      return;
    }

    // for (const key in folder) {
    //   if (!folder[key]) return;
    // }

    dispatch(
      addWorkout({
        mainFolder,
        subFolder,
        workout: FormField,
        id: String(Date.now()).slice(-5),
      })
    );
    resetFormFields();
  };

  const { message, visibility, success } = useSelector(selectToaster);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/workoutlist");
  };

  const submitOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      return;
    }
    return;
  };

  return (
    <div
      onKeyUp={submitOnEnter}
      className="relative top-0 left-0 z-10 flex items-start justify-center w-full min-h-screen px-4 py-12 bg-gray-900 sm:px-6 lg:px-8 h-scree "
    >
      <Toast visible={visibility} message={message} success={success} />

      <div className="absolute right-0 z-50 flex items-center justify-between w-full px-4 pt-8 pb-4 text-white shadow-sm shadow-black supersm:px-6 -top-4 ">
        <h2 className="text-lg font-bold tracking-tight text-center midsm:text-3xl supersm:text-2xl text-primary">
          Create your workout
        </h2>

        <span
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="inline-block px-3 py-2 text-gray-900 rounded-sm cursor-pointer  whitespace-nowrap bg-primary hover:brightness-75"
          onClick={handleClick}
        >
          See List
        </span>
      </div>
      <div className="w-full max-w-md mt-6 space-y-8 ">
        {/* <div>
          <h2 className="text-3xl font-bold tracking-tight text-center text-primary">
            Create your workout
          </h2>
        </div> */}
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="flex items-center justify-between h-auto gap-4 mb-2">
              <SelectFolder getFolderHandler={getFolder} />
              <AddFolderModal addFolder={addFolderHandler} />
            </div>
            <div className="mb-2">
              <FormInput
                onChange={onChangeHandler}
                name="exerciseName"
                type="text"
                placeholder="Exercise name"
                value={exerciseName}
              >
                Workout name
              </FormInput>
            </div>
            <div className="mb-2">
              <FormInput
                onChange={onChangeHandler}
                name="sets"
                type="number"
                required
                placeholder="Sets"
                value={sets}
                min="0"
                max="12"
              >
                Sets
              </FormInput>
            </div>
            <div className="mb-2">
              <FormInput
                onChange={onChangeHandler}
                name="reps"
                type="number"
                placeholder="Reps"
                value={reps}
                min="0"
                max="60"
              >
                Reps
              </FormInput>
            </div>
            <div className="mb-2">
              <FormInput
                onChange={onChangeHandler}
                name="restBetweenSets"
                type="number"
                required
                placeholder="Rest Between Sets"
                value={restBetweenSets}
                min="0"
                max="10"
              >
                Rest Between Sets
              </FormInput>
            </div>
            <div className="mb-2">
              <FormInput
                onChange={onChangeHandler}
                name="restAfterSetComplete"
                type="number"
                placeholder="Rest After Set Complete"
                value={restAfterSetComplete}
                min="0"
                max="10"
              >
                Rest After Set Complete
              </FormInput>
            </div>
            <div className="mb-2">
              <label htmlFor="Note" className="sr-only">
                Note
              </label>
              <textarea
                name="note"
                onChange={onChangeHandler}
                value={note}
                type="text"
                rows="5"
                required
                className="relative block w-full px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-800 rounded appearance-none resize-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Note"
              />
            </div>
          </div>

          <div>
            <Button onClick={handleSubmit} create>
              Create Workout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
