import { Button } from "../Button/button";

export default function FolderList({ children, singleFolder, ix }) {
  return (
    <>
      <div className="accordion-item bg-gray-900 relative">
        <div className="accordion-header relative">
          <Button
            create
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${ix}`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {singleFolder}
          </Button>
        </div>

        <div
          id={`collapse${ix}`}
          className="accordion-collapse collapse"
          data-bs-parent="#parentAcc"
        >
          {children}
        </div>
      </div>
    </>
  );
}
