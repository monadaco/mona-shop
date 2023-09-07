import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import { useSelector } from "react-redux";

export const Header = () => {
  const itemsCount = useSelector((state) => Object.values(state.orders.items).reduce((acc, i) => acc + i ?? 0, 0));
  return (
    <nav className=" bg-zinc-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex flex-shrink-0 items-center">
              <Logo width={36} />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 ">
            <Link
              to="/checkout"
              className=" bg-zinc-900 w-32 text-white rounded-md px-3 py-2 text-sm font-medium flex gap-x-3 justify-center"
              aria-current="page"
            >
              Checkout
              {itemsCount > 0 && (
                <span className="self-center rounded-full bg-zinc-700 w-5 h-5 flex justify-center items-center text-sm text-zinc-200">
                  {itemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
