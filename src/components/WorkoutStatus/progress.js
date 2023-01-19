import React from "react";

export default function Progress({ progress, prevLength, curLength }) {
  return (
    <div className="relative w-full h-3 mt-4 bg-gray-600 group/progress">
      <div
        className="h-3 transition-all duration-300 bg-primary"
        style={{ width: `${progress}%` }}
      >
        <div
          className={`${
            prevLength ? "block" : "hidden"
          }   top-3 relative bg-gray-600 left-0 px-3 py-2 text-white`}
        >
          {((prevLength / curLength) * 100).toFixed() + "% complete"}
        </div>
      </div>
    </div>
  );
}
