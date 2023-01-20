import React from "react";

export default function Progress({ progress, prevLength, curLength }) {
  return (
    <div className="relative w-full supersm:h-3 h-2 supersm:mt-4 mt-2 bg-gray-600 group/progress">
      <div
        className="supersm:h-3 h-2 transition-all duration-300 bg-primary"
        style={{ width: `${progress}%` }}
      >
        <div
          className={`${
            prevLength ? "block" : "hidden"
          }   supersm:top-3 top-2 relative bg-gray-600 left-0 px-3 supersm:py-2 py-1 text-white`}
        >
          {((prevLength / curLength) * 100).toFixed() + "% complete"}
        </div>
      </div>
    </div>
  );
}
