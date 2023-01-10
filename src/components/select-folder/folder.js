export const Folder = ({ children, onClick }) => {
  return (
    <>
      <li
        onClick={onClick}
        className={`block group hover:rounded w-full  hover:bg-gray-100 relative border-b-2 last-of-type:border-b-0`}
      >
        {children}
      </li>
    </>
  );
};
