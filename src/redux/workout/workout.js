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
export const selectRestCount = createSelector(
  [selectWorkout],
  (state) => state.restCount
);
export const selectRestButtonVisibility = createSelector(
  [selectWorkout],
  (state) => state.isRestButtonShown
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
    restCount: 0,
    isRestButtonShown: false,
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
      state.currentDayWorkouts = action.payload;
    },
    setWorkoutToBeDone: (state, action) => {
      const { day, list } = action.payload;

      state.workoutToBeDone = {
        day,
        list,
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
        state.selectOptions = [
          ...state.selectOptions,
          {
            mainFolder: folderParam.mainFolder,
            subFolder,
          },
        ];
        return;
      } else {
        const updatedFolders = [...state.selectOptions];

        updatedFolders[mainFolderIndex] = {
          mainFolder: updatedFolders[mainFolderIndex].mainFolder,
          subFolder: {
            ...updatedFolders[mainFolderIndex].subFolder,
            ...subFolder,
          },
        };

        state.selectOptions = updatedFolders;
      }
    },

    addWorkout: (state, action) => {
      const { mainFolder, subFolder, workout, id } = action.payload;

      const mainFolderWorkouts = state.workoutList[mainFolder] || {};
      const subFolderWorkouts = mainFolderWorkouts[subFolder] || [];

      const workoutExists = subFolderWorkouts.find(
        (w) => w.exerciseName === workout.exerciseName
      );
      if (workoutExists) {
        state.toaster = {
          message: "Workout Exists",
          visibility: true,
          success: false,
        };
        return;
      }

      state.toaster = {
        message: "Workout added",
        visibility: true,
        success: true,
      };
      state.workoutList = {
        ...state.workoutList,
        [mainFolder]: {
          ...mainFolderWorkouts,

          [subFolder]: [...subFolderWorkouts, { ...workout, id }],
        },
      };
    },

    removeWorkout: (state, action) => {
      const { mainFolder, subFolder, exerciseName } = action.payload;
      const mainFolderWorkouts = state.workoutList[mainFolder] || {};
      const subFolderWorkouts = mainFolderWorkouts[subFolder] || [];

      state.workoutList = {
        ...state.workoutList,
        [mainFolder]: {
          ...mainFolderWorkouts,
          [subFolder]: subFolderWorkouts.filter(
            (w) => w.exerciseName !== exerciseName
          ),
        },
      };
      state.toaster = {
        message: "Workout Removed",
        visibility: true,
        success: false,
      };
    },
    resetRest: (state, action) => {
      state.restCount = 0;
    },
    setRestBtnVisibility: (state, action) => {
      state.isRestButtonShown = action.payload;
    },
    setRestCount: (state, action) => {
      state.restCount = action.payload;
    },
    setToasterVisibility: (state, action) => {
      state.toaster = {
        ...state.toaster,
        visibility: false,
      };
    },
    activateToaster: (state, action) => {
      state.toaster = {
        message: action.payload,
        success: false,
        visibility: true,
      };
    },
    toggleWorkoutListVisibility: (state, action) => {
      return { ...state, isWorkoutListVisible: action.payload };
    },
    handleCarouselNavigation: (state, action) => {
      if (action.payload.direction === "prev") {
        state.currentIndex = (state.currentIndex - 1 + 3) % 3;
      } else {
        state.currentIndex = (state.currentIndex + 1) % 3;
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
  setToasterVisibility,
  resetRest,
  setRestBtnVisibility,
  activateToaster,
  removeWorkout,
  setRestCount,
} = workoutSlice.actions;
export default workoutSlice.reducer;
