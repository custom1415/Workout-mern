export const Dropdown = () => {
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);

  return (
    <div className="fixed  top-20 right-3">
      <div className="relative inline-block text-left">
        <div>
          <Button
            className="inline-flex w-full justify-center rounded-md  bg-gray-800 text-primary px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            click={() => setIsDropdownHidden(!isDropdownHidden)}
          >
            Options
            {/* <!-- Heroicon name: mini/chevron-down --> */}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>

        <div
          className={` ${
            isDropdownHidden ? "scale-0" : "scale-100"
          } transition ease-linear  absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-primary rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <span
              className="text-primary block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Edit
            </span>
          </div>
          <div className="py-1" role="none">
            <span
              className="text-primary block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Archive
            </span>
          </div>
          <div className="py-1" role="none">
            <span
              className="text-primary block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-4"
            >
              Share
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
