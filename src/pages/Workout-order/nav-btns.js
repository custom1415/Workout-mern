import { useEffect, useState } from "react";
import { FaChevronLeft, FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/button";
import { setCurrentDayWorkouts ,WorkoutFolder} from "../../redux/workout/workout";
export const NavBtns = ({ list, day }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(false);

  const check = () => {
    if (!list.length) {
      setisDisabled(true);
      // return navigate("/create");
    }
  };
  useEffect(() => {
    check();
  }, [isDisabled]);
  const handleClick = (e) => {
    if (e.target.dataset.location === "/workout") {
      dispatch(setCurrentDayWorkouts(list));
      dispatch(WorkoutFolder(day));
    }
    navigate(e.target.dataset.location);
  };
  return (
    <>
      <button
        data-location="/workout"
        className={`py-2 supersm:px-3 px-2 lg:text-xl  md:text-md text-sm whitespace-nowrap  rounded-sm cursor-pointer text-gray-900  bg-primary hover:scale-[1.05] transition-all midsm:block hidden ${
          isDisabled ? "hidden" : ""
        }`}
        onClick={handleClick}
      >
        Start{" "}
        <span data-location="/workout" className="hidden supersm:inline">
          &nbsp;Workout
        </span>
      </button>
      <div className="fixed bottom-0 left-0 flex items-center justify-between w-screen gap-4 p-2 midsm:hidden">
        <Button data-location="/" onClick={handleClick}>
          <FaHome data-location="/" className="scale-150"/>
        </Button>
        <button
          data-location="/workout"
          className={`py-2 supersm:px-3 flex-1 px-2 lg:text-xl  md:text-md text-sm whitespace-nowrap  rounded-sm cursor-pointer text-gray-900  bg-primary hover:scale-[1.05] transition-all ${
            isDisabled ? "hidden" : ""
          }`}
          onClick={handleClick}
        >
          Start
          <span data-location="/workout" className="hidden supersm:inline">
            &nbsp;Workout
          </span>
        </button>
        <Button onClick={handleClick} data-location="/workoutlist">
          <FaChevronLeft data-location="/workoutlist"  className="scale-150"/>
        </Button>
      </div>
    </>
  );
};
