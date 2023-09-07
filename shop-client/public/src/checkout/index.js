import { useDispatch, useSelector } from "react-redux";
import { Select } from "./select";
import { setAmount } from "../state/orders";
import { CheckoutForm } from "./checkout-form";
import { displayPrice } from "../helpers";

export const Checkout = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const isItems = useSelector((state) => Object.values(state.orders.items).find((i) => !!i));
  const items = useSelector(({ orders }) => orders.items);

  return (
    <div className="flex justify-between h-full">
      <div className=" w-1/3 bg-gray-100 h-full -ml-10 px-10  ">
        <h1 className="text-2xl font-bold text-gray-600 mt-10">Shopping Cart</h1>
        <ul className=" divide-y divide-gray-200">
          {isItems ? (
            products.map((product) =>
              !items[product.id] ? (
                <></>
              ) : (
                <li key={product.id} className="flex justify-between gap-x-10 py-5 ">
                  <div className="flex gap-x-5 justify-start">
                    <div className="aspect-h-1 relative aspect-w-1 w-24 h-28 overflow-hidden rounded-lg bg-white">
                      <img className="h-full w-full bg-gray-50" src={product.image} alt="" />
                    </div>
                    <div>
                      <h3 className="mt-4 text-sm text-gray-700 font-semibold">{product.title}</h3>
                      <p className="mt-1 text-sm font-medium text-gray-500">{displayPrice(product.price)}</p>
                    </div>
                  </div>
                  <div className="self-start">
                    <Select
                      value={items[product.id]}
                      setValue={(amount) => dispatch(setAmount({ id: product.id, amount }))}
                      options={Array(6)
                        .fill(0)
                        .map((_, i) => i)}
                    />
                  </div>
                </li>
              )
            )
          ) : (
            <p className="text-sm font-normal text-gray-500 mt-5">No items in the shopping bag.</p>
          )}
        </ul>
      </div>
      <CheckoutForm />
    </div>
  );
};
