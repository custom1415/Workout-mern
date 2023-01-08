export const Folder = ({ children, onClick, float }) => {
  return (
    <>
      <li
        onClick={onClick}
        className={`block group w-full hover:bg-gray-100  border-b-2 ${
          float ? "text-white" : "relative"
        }`}
      >
        {children}
      </li>
    </>
  );
};
