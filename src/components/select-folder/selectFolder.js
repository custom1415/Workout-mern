import { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectSelectOptions } from "../../redux/workout/workout";
import { Folder } from "./folder";

export const SelectFolder = ({ getFolderHandler }) => {
  //
  const FolderList = useSelector(selectSelectOptions);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [folderToAddTo, setFolderToAddTo] = useState();
  const toggleDropdown = () => {
    setDropdownVisibility(!dropdownVisibility);
  };
  const setFolder = (e) => {
    const mainFolder =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    const subFolder = e.target.textContent;
    setFolderToAddTo(`${mainFolder} - ${subFolder} `);
    getFolderHandler(mainFolder, subFolder);
    // const workout = { name: "test" };
    // dispatch(addFolderHandler({ mainFolder, subFolder, workout }));
    toggleDropdown();
  };
  return (
    <div className="h-full w-full relative z-20 ">
      <button
        className="w-full h-full justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        {folderToAddTo || " Choose Folder"}
        <FaChevronDown className="ml-2 w-4 h-4" />
      </button>

      <div className="absolute z-20 w-full bg-white rounded divide-y shadow ">
        {dropdownVisibility && (
          <ul className=" text-sm text-gray-700">
            {FolderList
              ? FolderList.map((folderName) => (
                  <Fragment key={folderName.mainFolder}>
                    <Folder>
                      <span className="px-4 inline-block py-2 max-w-[198px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {folderName.mainFolder}
                      </span>

                      <div className=" text-sm bg-gray-800 absolute z-50 lg:top-0 lg:right-[-100%] right-[0%]  lg:w-full w-1/2 h-max opacity-0 translate-y-[-3px]  group-hover:opacity-100  group-hover:translate-y-0   transition ease-linear duration-300 invisible group-hover:visible">
                        {Object.values(folderName.subFolder).map((item, i) => {
                          return (
                            <div
                              key={i}
                              onClick={setFolder}
                              className="text-white block py-2 px-4 last-of-type:border-b-0  border-b-[0.3px]  w-full hover:bg-gray-900  hover:text-white  "
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    </Folder>
                  </Fragment>
                ))
              : null}
          </ul>
        )}
      </div>
    </div>
  );
};
