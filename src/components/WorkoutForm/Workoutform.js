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
    // console.log(FormField);
  };
  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  const { visibility: v } = useSelector(selectToaster);
  useEffect(() => {
    let timeout;
    if (v) {
      timeout = setTimeout(() => dispatch(setToasterVisibility(false)), 2000);
    }
    return () => clearTimeout(timeout);
  }, [v]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(FormField);
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

    dispatch(addWorkout({ mainFolder, subFolder, workout: FormField,id:String(Date.now()).slice(-5)}));
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
      className="flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8  w-full relative z-10  top-0 left-0 bg-gray-900 h-scree min-h-screen "
    >
      <Toast visible={visibility} message={message} success={success} />

      <div className="shadow-black shadow-sm pt-8 pb-4 text-white w-full  flex items-center justify-between supersm:px-6 px-4 right-0 z-50 absolute -top-4 ">
        <h2 className="text-center midsm:text-3xl supersm:text-2xl text-lg font-bold tracking-tight text-primary">
          Create your workout
        </h2>

        <span
          className=" whitespace-nowrap inline-block px-3 py-2 bg-primary text-gray-900 rounded-sm cursor-pointer  hover:brightness-75 "
          onClick={handleClick}
        >
          See List
        </span>
      </div>
      <div className="w-full max-w-md space-y-8 mt-6 ">
        {/* <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary">
            Create your workout
          </h2>
        </div> */}
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="flex justify-between items-center h-auto  gap-4 mb-2">
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
                className="relative  resize-none block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Note"
              />
            </div>
          </div>

          <div>
            <Button click={handleSubmit} create>
              Create Workout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
