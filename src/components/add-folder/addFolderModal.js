import { Button } from "../Button/button";
import { GrClose } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFolderHandler } from "../../redux/workout/workout";
export const AddFolderModal = ({ addFolder }) => {
  const [subFolderLength, setSubFolderLength] = useState(1);
  const [SubFolderValue, setSubFolderValue] = useState({});

  let defaultFolderStructure = {
    mainFolder: "",
  };
  const [FormField, setFormField] = useState(defaultFolderStructure);
  const { mainFolder } = FormField;
  useEffect(() => {
    // console.log(FormField);
  }, [FormField]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    for (const key in FormField) {
      if (!FormField[key]) return;
    }

    console.log(SubFolderValue);
    // subFolder.push(...Object.values(SubFolderValue));

    setFormField({
      ...FormField,
    });
    console.log(FormField);
    // addFolder(FormField, SubFolderValue);
    dispatch(addFolderHandler({ folderParam: FormField, SubFolderValue }));
    setFormField(defaultFolderStructure);
    setSubFolderValue({});
    setSubFolderLength(1)
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("subFolder")) {
      setSubFolderValue({ ...SubFolderValue, [name]: value });
    } else {
      setFormField({
        ...FormField,
        [name]: value,
      });
    }
  };
  return (
    <>
      <div>
        <Button data-bs-toggle="modal" data-bs-target="#ModalSm">
          <FaPlus />
        </Button>
      </div>
      <div
        className="modal fade fixed top-0 z-50 left-0 backdrop-blur-sm hidden w-screen h-full outline-none overflow-x-hidden overflow-y-auto"
        id="ModalSm"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-sm relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
            
              >
                Add Folder
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <h1 className="mb-1 text-gray-400">Main Folder</h1>
              <input
                onChange={handleChange}
                name="mainFolder"
                value={mainFolder}
                placeholder="eg: Push Pull Legs"
                className="relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {Array.from({ length: subFolderLength }).map((subF, i) => {
                return (
                  <Fragment key={i}>
                    <h1 className="mb-2 mt-4 text-gray-400">Sub Folder</h1>
                    <div className="flex justify-between items-center gap-3">
                      <input
                        onChange={handleChange}
                        name={`subFolder${i}`}
                        value={SubFolderValue[`subFolder${i}`] || ""}
                        placeholder="eg: Push"
                        className="grow relative block w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      <Button
                        click={() => setSubFolderLength((prev) => prev + 1)}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className="modal-footer flex justify-between items-center gap-2  p-4 border-t border-gray-200 rounded-b-md">
              <Button  data-bs-toggle="modal" data-bs-target="#ModalSm"  click={handleSubmit} create>
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
