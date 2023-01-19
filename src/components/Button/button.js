export const Button = ({
  children,
  onClick,
  isFloatingBtn,
  isUpBtn,
  isCarouselBtn,
  left,
  right,
  create,
  start,

  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      className={`

      ${
        start
          ? "bg-blue-700 text-white h-full grid place-content-center "
          : "bg-gray-800"
      }
      ${create && "w-full"}
      ${
        isCarouselBtn &&
        `fixed top-[50%] translate-y-[-50%]
         ${left ? "left-16" : "right-16"}`
      }
      ${
        isFloatingBtn
          ? "fixed top-4 right-4 text-4xl  w-10 h-10  flex justify-center items-center rounded-[50%]  "
          : "px-8 py-3 rounded "
      } 
      ${isUpBtn && `bottom-8   z-30`} 
    btn-primary`}
      {...rest}
    >
      {children}
    </button>
  );
};
