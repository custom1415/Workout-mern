import { Fragment, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectSelectOptions,
  removeSubFolderHandler,
} from "../../redux/workout/workout";
import { ConfimationModal } from "./confimationModal";
import { Folder } from "./folder";

export const SelectFolder = ({ getFolderHandler ,toggle}) => {
  //
  const FolderList = useSelector(selectSelectOptions);

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [folderToAddTo, setFolderToAddTo] = useState();
  const [mainFolder, setMainFolder] = useState("");
  const [subFolder, setSubFolder] = useState("");

  const toggleDropdown = () => {
    setDropdownVisibility(!dropdownVisibility);
  };
  useEffect(() => {
    if (!FolderList.length) {
      setFolderToAddTo("");
    }
  }, [FolderList.length]);

  const setFolder = (e) => {
    if (e.target.tagName === "svg") return;
    if (e.target.tagName === "path") return;
    const mainFolder =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    const subFolder = e.target.textContent;
    setFolderToAddTo(`${mainFolder} - ${subFolder} `);
    getFolderHandler(mainFolder, subFolder);
    // const workout = { name: "test" };
    // dispatch(addFolderHandler({ mainFolder, subFolder, workout }));
    toggleDropdown();
  };
  const dispatch = useDispatch();
  // const removeSubFolder = () => {
  //   // if (e.target.tagName !== "DIV" && e.target.tagName !== "path") {
  //   //   const subFolder = e.target.previousSibling.textContent;
  //   //   const mainFolder =
  //   //     e.target.parentElement.parentElement.parentElement.firstElementChild
  //   //       .textContent;
  //   //   dispatch(removeSubFolderHandler({ mainFolder, subFolder }));
  //   // }
  //   // const mainFolder =
  //   //   e.target.parentElement.parentElement.firstElementChild.textContent;
  // };
  return (
    <div className="h-full w-full relative z-50  ">
      <ConfimationModal
        mainFolder={mainFolder}
        subFolder={subFolder}
        setFolderToAddTo={setFolderToAddTo}
      />
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
            {FolderList.length ? (
              FolderList.map((folderName) => (
                <Fragment key={folderName.mainFolder}>
                  <Folder>
                    <span className="px-4 inline-block py-2 max-w-[198px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {folderName.mainFolder}
                    </span>

                    <div className=" text-sm bg-gray-800 absolute z-50 lg:top-0 lg:right-[-100%] right-[0%]  lg:w-full w-2/3 h-max opacity-0 translate-y-[-3px]  group-hover:opacity-100  group-hover:translate-y-0   transition ease-linear duration-300 invisible group-hover:visible">
                      {Object.values(folderName.subFolder).map((item, i) => {
                        return (
                          <div
                            key={i}
                            onClick={setFolder}
                            className="relative text-white block py-2 px-4 last-of-type:border-b-0  border-b-[0.3px]  w-full hover:bg-gray-700  hover:text-white  "
                          >
                            {item}

                            <IoMdClose
                              className="absolute text-red-600 right-[5%] font-bold text-xl top-1/2 -translate-y-1/2"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMainFolder(folderName.mainFolder);
                                setSubFolder(item);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#confirm"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Folder>
                </Fragment>
              ))
            ) : (
              <div className=" flex justify-center py-4">
                <p>Empty!</p>
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
