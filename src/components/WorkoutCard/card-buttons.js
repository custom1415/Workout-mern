import { FaEdit, FaStickyNote, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setEditValues } from "../../redux/workout/workout";

export const CardButtons = ({
  toggleNoteVisibility,
  RemoveWorkout,
  workout,
  singleFolder,
  singleSubFolder,
}) => {
  const dispatch = useDispatch();
  const setEditVals = () => {
    dispatch(setEditValues({ workout, singleFolder, singleSubFolder }));
  };
  return (
    <div
      className={` absolute bottom-0 transition-all right-0 gap-2 h-12 pr-4 group-hover:opacity-100 justify-end  opacity-0 group-hover:translate-y-0 translate-y-4 w-full flex items-center bg-gray-900 text-white z-10`}
    >
      <span
        className="inline-block p-1 bg-blue-700  hover:bg-blue-800"
        onClick={toggleNoteVisibility}
      >
        <FaStickyNote />
      </span>
      <span
        className="inline-block p-1 bg-blue-700  hover:bg-blue-800"
        onClick={setEditVals}
      >
        <FaEdit />
      </span>
      <span
        className="inline-block p-1 bg-red-600  hover:bg-red-700"
        onClick={RemoveWorkout}
      >
        <FaTrashAlt />
      </span>
    </div>
  );
};
