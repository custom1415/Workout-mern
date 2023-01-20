import React from "react";
import { useDispatch } from "react-redux";
import { activateToaster, removeSubFolderHandler } from "../../redux/workout/workout";
import { Button } from "../Button/button";

export const ConfimationModal = ({ mainFolder, subFolder,setFolderToAddTo }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="modal fade backdrop-blur-sm backdrop-brightness-50 fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
        id="confirm"
        tabIndex="-1"
        aria-labelledby="confirm deletion"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="confirmDeletion"
              >
                Are you Sure?
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              Do you want to delete{" "}
              <span className="text-red-500">"{subFolder}"</span>?
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <Button
                type="button"
                data-bs-dismiss="modal"
                style={{ marginRight: "1em" ,background:"#ef4444",color:"white"}}
              >
                Close
              </Button>
              <Button
                type="button"
                style={{
                  marginRight: "1em",
                  background: "#1d4ed8",
                  color: "white",
                }}
                onClick={() => {
                  {
                    dispatch(removeSubFolderHandler({ mainFolder, subFolder }));
                    setFolderToAddTo('')
    
                  }
                }}
                data-bs-dismiss="modal"
              >
              Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
