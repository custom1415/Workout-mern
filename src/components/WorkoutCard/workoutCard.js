// import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { BiNote } from "react-icons/bi";

export const WorkoutCard = ({
  exerciseName,
  sets,
  reps,
  restBetweenSets,
  restAfterSetComplete,
}) => {
  return (
    <>
      <div className=" w-full border border-gray-500 mt-4 px-4 py-2 hover:border-primary bg-gray-900 overflow-hidden">
        <h1 className="text-white text-center text-2xl overflow-hidden ">
          {exerciseName || "Push Pull"}
        </h1>
        <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
          Sets : <span>{sets || "0"}</span>
        </p>
        <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
          Reps : <span>{reps || "0"}</span>
        </p>
        <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
          Rest Between Sets : <span>{restBetweenSets || "0"}</span> mins
        </p>
        <p className="bg-white pl-1 text-black my-1 lg:text-sm text-[12px]">
          Rest After Set : <span>{restAfterSetComplete || "0"}</span> mins
        </p>
      </div>
    </>
  );
};
