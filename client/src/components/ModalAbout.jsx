import { XIcon } from "@heroicons/react/solid";

export default function ModalAbout({ show }) {
  const closeModalClickHandler = () => {
    show();
  };

  return (
    <div className="bg-black bg-opacity-50 absolute z-10 inset-0 flex justify-center items-center">
      <div className="border-4 rounded-lg w-2/6 h-1/6 bg-white border-purple-600 flex flex-col ">
        <div className="mb-10 flex justify-end">
          <XIcon onClick={closeModalClickHandler} className="ml-10 h-5 w-5" />
        </div>
        <div className="flex justify-center">
          <h1>Book-it</h1>
          <p className="text-black">
            Book it is a small application that helps businesses manage their appointments, <br /> Configure your
            business data, <br /> tell the app what services you offer, <br /> manage your employees, <br /> use the
            calendar to keep track of your bookings
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={closeModalClickHandler}
            className="px-3 py-1 border-2 border-black text-white bg-purple-600 hover:bg-purple-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
