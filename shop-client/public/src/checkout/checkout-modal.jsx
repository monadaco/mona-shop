import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../state/orders";

export const CheckoutModal = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigatingOut = () => {
    dispatch(reset());
    navigate("/");
  };

  return isOpen ? (
    <div className="fixed w-full h-full flex justify-center items-center left-0 top-0">
      <div onClick={navigatingOut} className="fixed w-full h-full opacity-40 bg-zinc-900">
        {" "}
      </div>
      <div className=" z-30 flex gap-y-4 flex-col rounded-md bg-white p-10 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 h-fit w-1/3">
        <h1 className="text-xl font-semibold text-gray-700 mb-2">Awesome! 🎉</h1>
        <p className="text-md font-semibold text-gray-500 mb-2">Your order is now on the way, and soon be with you.</p>
        <button
          onClick={navigatingOut}
          type="button"
          className="w-full mt-2 self-center rounded-md text-center  bg-slate-800 px-5 py-2 text-md font-semibold text-slate-50 shadow-sm ring-1 ring-inset ring-slate-800 hover:bg-slate-950 disabled:bg-slate-600 disabled:ring-slate-600"
        >
          Continue shopping
        </button>
      </div>
    </div>
  ) : null;
};
