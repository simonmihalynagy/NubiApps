import { XIcon } from "@heroicons/react/solid";

export default function ModalProceedCancel({ show, description }) {
  const closeModalClickHandler = () => {
    show();
  };

  const proceedClickHandler = (stg) => {
    //confirm action that triggered modal
    Show();
  };

  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
      <div className="border-4 rounded-lg border-black">
        <div className="mb-10 flex justify-end">
          <XIcon onClick={closeModalClickHandler} className="ml-10 h-5 w-5" />
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="flex justify-center mt-10">
          <button className="px-3 py-1 border-2 border-black text-white bg-green-600">Proceed</button>
        </div>
      </div>
    </div>
  );
}
