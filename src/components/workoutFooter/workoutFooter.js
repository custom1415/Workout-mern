import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  handleCarouselNavigation,
  selectCurrentIndex,
} from "../../redux/workout/workout";
import { Button } from "../Button/button";

export const WorkoutFooter = () => {
  const [workoutToShow, setWorkoutToShow] = useState(null);
  const dispatch = useDispatch();
  const currentIndex = useSelector(selectCurrentIndex);
  const navigateCarousel = (e) => {
    if (e.target.dataset.name === "prev")
      dispatch(handleCarouselNavigation("prev"));
    else dispatch(handleCarouselNavigation("next"));
  };
  useEffect(() => {
    if (currentIndex === 0) {
      setWorkoutToShow("Previous Workouts");
    } else if (currentIndex === 1) {
      setWorkoutToShow("Current Workout");
    } else {
      setWorkoutToShow("Next Workouts");
    }
  }, [currentIndex]);

  return (
    <>
      <footer className="w-full bg-[#09061b] h-12 fixed bottom-0 left-0 flex justify-between items-center px-4 z-50">
        <Button data-name="prev" onClick={navigateCarousel}>
          <FaChevronLeft data-name="prev" />
        </Button>
        <h1 className="text-white">{workoutToShow}</h1>
        <Button data-name="next" onClick={navigateCarousel}>
          <FaChevronRight data-name="next" />
        </Button>
      </footer>
    </>
  );
};
