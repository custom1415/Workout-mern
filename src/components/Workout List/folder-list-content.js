import MainFolderWorkouts from "./main-folder-workouts";
import SubFolderWorkouts from "./sub-folder-workouts";

export const FolderListContent = ({
  workoutList,
  singleFolder,
  handleClick,
}) => {
  return (
    <>
      <div
        id="parentB"
        className={`accordion-body py-4 px-5 grid grid-cols-1 gap-2 accordion-collapse `}
      >
        {Object.entries(workoutList[singleFolder]).map((singleSubFolder) => {
          const [folder, folderValue] = singleSubFolder;
          return (
            <div key={folder}>
              <MainFolderWorkouts
                handleClick={handleClick}
                folder={folder}
                folderValue={folderValue}
                singleFolder={singleFolder}
              >
                <div className="w-full grid lg:grid-cols-3 midsm:grid-cols-2 grid-cols-1 gap-4 place-items-center place-content-center transition-all">
                  <SubFolderWorkouts
                    folder={folder}
                    folderValue={folderValue}
                    singleFolder={singleFolder}
                  />
                </div>
              </MainFolderWorkouts>
            </div>
          );
        })}
      </div>
    </>
  );
};
