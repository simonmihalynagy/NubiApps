import { XIcon } from "@heroicons/react/solid";

export default function ModalProceedCancel({ show, proceed, cancel, description, title }) {
  const closeModalClickHandler = () => {
    show();
  };

  const proceedClickHandler = () => {
    //confirm action that triggered modal
    proceed();
  };

  const cancelClickHandler = () => {
    cancel();
    //cancel action that triggered modal
  };

  return (
    <div className="bg-black z-10 bg-opacity-50 absolute inset-0 flex justify-center items-center">
      <div className="border-4 rounded-lg w-2/6 h-1/6 bg-white border-purple-600 flex flex-col ">
        <div className="mb-10 flex justify-between">
          <h4>{title}</h4>
          <XIcon onClick={closeModalClickHandler} className="ml-10 h-5 w-5" />
        </div>
        <div className="flex justify-center text-center">
          <p>{description}</p>
        </div>
        <div className="flex justify-around mt-10">
          <button onClick={proceedClickHandler} className="px-3 py-1 border-2 border-black text-white bg-green-700">
            Proceed
          </button>
          <button onClick={cancelClickHandler} className="px-3 py-1 border-2 border-black bg-red-700 text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
