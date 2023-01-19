export const Note = ({ NoteVisibility, toggleNoteVisibility, note }) => {
  return (
    <div
      className={`absolute  top-0 left-0 w-full h-full text-white bg-gray-800  px-4
    transition-all
    ${
      NoteVisibility
        ? "translate-y-0 opacity-100 z-50"
        : "translate-y-4 opacity-0 pointer-events-none"
    }`}
      onClick={toggleNoteVisibility}
    >
      {note ? (
        <span className="inline-block m-3 mb-0 text-gray-600">Note : </span>
      ) : (
        <></>
      )}
      <span>
        {note || <h1 className="block m-3 text-center ">No Notes Set</h1>}
      </span>
    </div>
  );
};
