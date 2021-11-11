import { XIcon } from "@heroicons/react/solid";

export default function ModalProceedCancel({ show, proceed, cancel, description, title }) {
  const closeModalClickHandler = () => {
    show();
  };

  const proceedClickHandler = (stg) => {
    //confirm action that triggered modal
    proceed();
  };

  const cancelClickHandler = (stg) => {
    cancel();
    //cancel action that triggered modal
  };

  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
      <div className="border-4 rounded-lg border-black">
        <div className="mb-10 flex justify-between">
          <h4>{title}</h4>
          <XIcon onClick={closeModalClickHandler} className="ml-10 h-5 w-5" />
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="flex justify-around mt-10">
          <button className="px-3 py-1 border-2 border-black text-white bg-green-600">Proceed</button>
          <button className="px-3 py-1 border-2 border-black bg-red-700 text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}
