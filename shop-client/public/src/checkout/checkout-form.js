import { useDispatch, useSelector } from "react-redux";
import { sendOrder, setEmail, setFullName } from "../state/orders";
import { calculateTotal, displayPrice } from "../helpers";
import { CheckoutModal } from "./checkout-modal";
import { useState } from "react";

export const CheckoutForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const subTotal = useSelector(calculateTotal);
  const email = useSelector((state) => state.orders.email);
  const fullName = useSelector((state) => state.orders.fullName);

  return (
    <div className="flex justify-center items-top pt-20 w-full">
      <div className=" flex gap-y-4 flex-col rounded-md bg-white p-10 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 h-fit w-1/2">
        <h1 className="text-xl font-semibold text-gray-700 mb-2">Order Summery</h1>
        <ul className="divide-y divide-gray-200 flex flex-col text-sm font-normal leading-6 text-gray-500">
          <li className="flex justify-between pt-4">
            <span>Sub total</span>
            <span>{displayPrice(subTotal)}</span>
          </li>
          <li className="flex justify-between pt-4">
            <span>Estimated tax</span>
            <span className="">{displayPrice(0)}</span>
          </li>
          <li className="flex justify-between pt-4">
            <span>Total</span>
            <span>{displayPrice(subTotal)}</span>
          </li>
        </ul>
        <div className="sm:col-span-4 ">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Full Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                value={fullName}
                onChange={(e) => dispatch(setFullName(e.target.value))}
                type="text"
                name="name"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                type="text"
                name="email"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <button
          disabled={!subTotal || !email || !fullName}
          onClick={async () => {
            const isOk = await dispatch(sendOrder());
            if (isOk) {
              setIsOpen(true);
            }
          }}
          type="button"
          className="w-full mt-2 self-center rounded-md  bg-slate-800 px-5 py-2 text-md font-semibold text-slate-50 shadow-sm ring-1 ring-inset ring-slate-800 hover:bg-slate-950 disabled:bg-slate-600 disabled:ring-slate-600"
        >
          Checkout now!
        </button>
      </div>
      <CheckoutModal isOpen={isOpen} />
    </div>
  );
};
