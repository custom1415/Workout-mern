// import { useEffect, useState } from "react";
// import { SelectFolder } from "../select-folder/selectFolder";
// import { Button } from "../Button/button";
// import { FormInput } from "../Forminput/forminput";
// import { useDispatch } from "react-redux";
// import {
//   addFolderHandler,
//   addWorkout,
//   selectIsWorkoutListVisible,
//   toggleWorkoutListVisibility,
// } from "../../redux/workout/workout";
// import { AddFolderModal } from "../add-folder/addFolderModal";
// import _ from "lodash";
// import { ImMenu } from "react-icons/im";
// import { useSelector } from "react-redux";
// export const Form = () => {
//   const dispatch = useDispatch();
//   const workout = {
//     exerciseName: "Push ups",
//     sets: 8,
//     reps: 12,
//     restBetweenSets: 2,
//     restAfterSetComplete: 2,
//   };
//   const defaultFormFields = {
//     exerciseName: "k",
//     sets: "2",
//     reps: "2",
//     restBetweenSets: "2",
//     restAfterSetComplete: "2",
//   };

//   const [FormField, setFormField] = useState(defaultFormFields);
//   const [folder, setFolder] = useState({
//     mainFolder: "",
//     subFolder: "",
//   });
//   const { mainFolder, subFolder } = folder;
//   const [addedFolder, setAddedFolder] = useState([]);
//   const { exerciseName, sets, reps, restAfterSetComplete, restBetweenSets } =
//     FormField;

//   const getFolder = (mainFolder, subFolder) => {
//     setFolder({
//       mainFolder,
//       subFolder,
//     });
//   };

//   const onChangeHandler = (e) => {
//     const { value, name } = e.target;
//     setFormField({ ...FormField, [name]: value });
//     // console.log(FormField);
//   };
//   const resetFormFields = () => {
//     // setFormField({ ...defaultFormFields, folder: folder });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(FormField);

//     for (const key in FormField) {
//       if (!FormField[key]) return;
//     }

//     for (const key in folder) {
//       if (!folder[key]) return;
//     }

//     dispatch(addWorkout({ mainFolder, subFolder, workout: FormField }));
//   };

//   // const addFolderHandler = (folderParam, SubFolderValue) => {
//   //   let mainFolderExists = false;
//   //   let mainFolderIndex;
//   //   console.log(folderParam);

//   //   // Check if main folderParam already exists in addedFolder
//   //   addedFolder.forEach((f, index) => {
//   //     if (f.mainFolder === folderParam.mainFolder) {
//   //       mainFolderExists = true;
//   //       mainFolderIndex = index;
//   //     }
//   //   });

//   //   // If main folderParam doesn't exist, add it to addedFolder
//   //   if (!mainFolderExists) {
//   //     setAddedFolder([
//   //       ...addedFolder,
//   //       {
//   //         mainFolder: folderParam.mainFolder,
//   //         subFolder: SubFolderValue,
//   //       },
//   //     ]);
//   //   } else {
//   //     // If main folderParam exists, add subfolder to the main folderParam's subfolder object
//   //     const updatedFolders = [...addedFolder];

//   //     updatedFolders[mainFolderIndex] = {
//   //       mainFolder: updatedFolders[mainFolderIndex].mainFolder,

//   //       subFolder: {
//   //         ...updatedFolders[mainFolderIndex].subFolder,
//   //         ...SubFolderValue,
//   //       },
//   //     };
//   //     setAddedFolder(updatedFolders);
//   //   }
//   // };
//   const isWorkoutListVisible = useSelector(selectIsWorkoutListVisible);
//   const handleClick = () => {
//     dispatch(toggleWorkoutListVisibility(!isWorkoutListVisible));
//   };
//   return (
//     <div className="flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-[40%] w-full relative z-10  top-0 left-0 bg-gray-900 h-screen ">
//       <div className="shadow-black shadow-sm lg:hidden pt-8 pb-4 text-white w-full  flex items-center justify-end pr-6 right-0 z-50 absolute -top-4 ">
//         <span
//           className="inline-block px-3 py-2 bg-primary text-gray-900 rounded-sm cursor-pointer  hover:brightness-75 "
//           onClick={handleClick}
//         >
//           See List
//         </span>
//       </div>
//       <div className="w-full max-w-md space-y-8 lg:mt-6 mt-14 ">
//         <div>
//           <h2 className="text-center text-3xl font-bold tracking-tight text-primary">
//             Create your workout
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6">
//           <div className="rounded-md shadow-sm">
//             <div className="flex justify-between items-center h-auto  gap-4 mb-2">
//               <SelectFolder
//                 FolderList={addedFolder}
//                 getFolderHandler={getFolder}
//               />
//               <AddFolderModal addFolder={addFolderHandler} />
//             </div>
//             <div className="mb-2">
//               <FormInput
//                 onChange={onChangeHandler}
//                 name="exerciseName"
//                 type="text"
//                 placeholder="Exercise name"
//                 value={exerciseName}
//               >
//                 Workout name
//               </FormInput>
//             </div>
//             <div className="mb-2">
//               <FormInput
//                 onChange={onChangeHandler}
//                 name="sets"
//                 type="text"
//                 required
//                 placeholder="Sets"
//                 value={sets}
//               >
//                 Sets
//               </FormInput>
//             </div>
//             <div className="mb-2">
//               <FormInput
//                 onChange={onChangeHandler}
//                 name="reps"
//                 type="text"
//                 placeholder="Reps"
//                 value={reps}
//               >
//                 Reps
//               </FormInput>
//             </div>
//             <div className="mb-2">
//               <FormInput
//                 onChange={onChangeHandler}
//                 name="restBetweenSets"
//                 type="text"
//                 required
//                 placeholder="Rest Between Sets"
//                 value={restBetweenSets}
//               >
//                 Rest Between Sets
//               </FormInput>
//             </div>
//             <div className="mb-2">
//               <FormInput
//                 onChange={onChangeHandler}
//                 name="restAfterSetComplete"
//                 type="text"
//                 placeholder="Rest After Set Complete"
//                 value={restAfterSetComplete}
//               >
//                 Rest After Set Complete
//               </FormInput>
//             </div>
//             <div className="mb-2">
//               <label htmlFor="Note" className="sr-only">
//                 Note
//               </label>
//               <textarea
//                 name="note"
//                 type="text"
//                 rows="5"
//                 required
//                 className="relative  resize-none block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Note"
//               />
//             </div>
//           </div>

//           <div>
//             <Button click={handleSubmit} create>
//               Create Workout
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { SelectFolder } from "../select-folder/selectFolder";
import { Button } from "../Button/button";
import { FormInput } from "../Forminput/forminput";
import { useDispatch } from "react-redux";
import {
  activateToaster,
  addFolderHandler,
  addWorkout,
  selectIsWorkoutListVisible,
  selectToaster,
  setToasterVisibility,
  toggleWorkoutListVisibility,
} from "../../redux/workout/workout";
import { AddFolderModal } from "../add-folder/addFolderModal";
import _ from "lodash";
import { useSelector } from "react-redux";
import Toast from "../toast/Toast";
export const Form = () => {
  const dispatch = useDispatch();

  const defaultFormFields = {
    exerciseName: "",
    sets: "",
    reps: "",
    restBetweenSets: "",
    restAfterSetComplete: "",
  };

  const [FormField, setFormField] = useState(defaultFormFields);
  const [folder, setFolder] = useState({
    mainFolder: "",
    subFolder: "",
  });
  const { mainFolder, subFolder } = folder;
  const { exerciseName, sets, reps, restAfterSetComplete, restBetweenSets } =
    FormField;

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
    }
    for (const key in FormField) {
      if (!FormField[key]) {
        dispatch(activateToaster("Please fill in all the input fields"));
      }
    }

    for (const key in folder) {
      if (!folder[key]) return;
    }

    dispatch(addWorkout({ mainFolder, subFolder, workout: FormField }));
    resetFormFields();
  };

  const isWorkoutListVisible = useSelector(selectIsWorkoutListVisible);
  const { message, visibility, success } = useSelector(selectToaster);
  const handleClick = () => {
    dispatch(toggleWorkoutListVisibility(!isWorkoutListVisible));
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
