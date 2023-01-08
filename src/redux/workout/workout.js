import { createSelector, createSlice } from "@reduxjs/toolkit";

const selectWorkout = (state) => state.workout;
export const selectCurrentIndex = createSelector(
  [selectWorkout],
  (state) => state.currentIndex
);

export const selectWorkoutList = createSelector(
  [selectWorkout],
  (state) => state.workoutList
);
export const selectSelectOptions = createSelector(
  [selectWorkout],
  (state) => state.selectOptions
);
export const selectWorkoutToBeDone = createSelector(
  [selectWorkout],
  (state) => state.workoutToBeDone
);
export const selectCurrentDayWorkouts = createSelector(
  [selectWorkout],
  (state) => state.currentDayWorkouts
);
export const selectIsWorkoutListVisible = createSelector(
  [selectWorkout],
  (state) => state.isWorkoutListVisible
);
export const selectToaster = createSelector(
  [selectWorkout],
  (state) => state.toaster
);
const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    currentDayWorkouts: [],
    workoutToBeDone: {
      day: "",
      list: [],
    },
    toaster: {
      message: "default",
      visibility: false,
      success: false,
    },
    isWorkoutListVisible: false,
    currentIndex: 1,
    workoutList: {},
    selectOptions: [
      {
        mainFolder: "Push/Pull/Legs Split",
        subFolder: {
          subFolder0: "Push",
          subFolder1: "Pull",
          subFolder2: "Legs",
        },
      },
      {
        mainFolder: "Bro Split",
        subFolder: {
          subFolder0: "Chest",
          subFolder1: "Back",
          subFolder2: "Leg",
          subFolder3: "Shoulder",
          subFolder4: "Arm",
        },
      },
      {
        mainFolder: "Upper/Lower Split",
        subFolder: {
          subFolder0: "Upper-Body",
          subFolder1: "Lower-Body",
        },
      },
      {
        mainFolder: "Full Body Split",
        subFolder: {
          subFolder0: "Day-1",
          subFolder1: "Day-2",
          subFolder2: "Day-3",
        },
      },
    ],
  },
  reducers: {
    setCurrentDayWorkouts: (state, action) => {
      return {
        ...state,
        currentDayWorkouts: action.payload,
      };
    },
    setWorkoutToBeDone: (state, action) => {
      const { day, list } = action.payload;
      return {
        ...state,
        workoutToBeDone: {
          day,
          list,
        },
      };
    },
    addFolderHandler: (state, action) => {
      const { folderParam, SubFolderValue } = action.payload;
      const subFolder = {};
      Object.entries(SubFolderValue).forEach(([key, value]) => {
        subFolder[value] = value;
      });
      let mainFolderExists = false;
      let mainFolderIndex;
      console.log(folderParam);

      // Check if main folderParam already exists in addedFolder
      state.selectOptions.forEach((f, index) => {
        if (f.mainFolder === folderParam.mainFolder) {
          mainFolderExists = true;
          mainFolderIndex = index;
        }
      });

      // If main folderParam doesn't exist, add it to addedFolder
      if (!mainFolderExists) {
        return {
          ...state,
          selectOptions: [
            ...state.selectOptions,
            {
              mainFolder: folderParam.mainFolder,
              subFolder,
            },
          ],
        };
      } else {
        const updatedFolders = [...state.selectOptions];

        updatedFolders[mainFolderIndex] = {
          mainFolder: updatedFolders[mainFolderIndex].mainFolder,
          subFolder: {
            ...updatedFolders[mainFolderIndex].subFolder,
            ...subFolder,
          },
        };
        return {
          ...state,
          selectOptions: updatedFolders,
        };
      }
    },

    addWorkout: (state, action) => {
      const { mainFolder, subFolder, workout } = action.payload;

      const mainFolderWorkouts = state.workoutList[mainFolder] || {};
      const subFolderWorkouts = mainFolderWorkouts[subFolder] || [];

      const workoutExists = subFolderWorkouts.find(
        (w) => w.exerciseName === workout.exerciseName
      );
      if (workoutExists) {
        return {
          ...state,
          toaster: {
            message: "Workout Exists",
            visibility: true,
            success: false,
          },
        };
      }

      return {
        ...state,
        toaster: {
          message: "Workout added",
          visibility: true,
          success: true,
        },
        workoutList: {
          ...state.workoutList,
          [mainFolder]: {
            ...mainFolderWorkouts,
            [subFolder]: [...subFolderWorkouts, workout],
          },
        },
      };
    },
    setToasterVisibility: (state, action) => {
      return {
        ...state,
        toaster: {
          ...state.toaster,
          visibility: false,
        },
      };
    },
    toggleWorkoutListVisibility: (state, action) => {
      return { ...state, isWorkoutListVisible: action.payload };
    },
    handleCarouselNavigation: (state, action) => {
      if (action.payload.direction === "prev") {
        return {
          ...state,
          currentIndex: (state.currentIndex - 1 + 3) % 3,
        };
      } else {
        return {
          ...state,
          currentIndex: (state.currentIndex + 1) % 3,
        };
      }
    },
  },
});

export const {
  handleCarouselNavigation,
  addWorkout,
  addFolderHandler,
  setWorkoutToBeDone,
  setCurrentDayWorkouts,
  toggleWorkoutListVisibility,
  setToasterVisibility
} = workoutSlice.actions;
export default workoutSlice.reducer;
