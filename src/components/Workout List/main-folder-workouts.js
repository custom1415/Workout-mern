import React from "react";
import { FaPlay } from "react-icons/fa";
import { Button } from "../Button/button";
export default function MainFolderWorkouts({
  handleClick,
  singleFolder,
  folderValue,
  folder,
  children,
}) {
  return (
    <div>
      <Button
        data-bs-toggle="collapse"
        data-bs-target={`#${folder}`}
        aria-expanded="false"
        aria-controls="collapseOne"
        create
      >
        <div className=" group-hover/btn:scale-125 transition-all">
          {folder}
        </div>

        <div
          onClick={handleClick.bind(null, singleFolder, folder)}
          className="group absolute top-1/2 -translate-y-1/2 right-0 w-1/6 grid place-items-center rounded-sm text-gray-900 bg-primary h-full p-2"
        >
          <FaPlay className="scale-110 group-hover:scale-150 transition-all " />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2  text-white w-8 rounded-sm  h-full grid place-items-center left-0 bg-blue-700">
          {folderValue.length}
        </div>
      </Button>
      {children}
    </div>
  );
}
