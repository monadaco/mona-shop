import {Link} from "react-router-dom";
import logo from "./assets/logo.svg";

export const Header = () => {
  return (
    <nav className=" bg-zinc-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 gap-4 items-center">
          <div className="flex items-center justify-center">
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-12" />
            </Link>
          </div>
          <p className=" text-zinc-200 font-bold">Admin Panel</p>
        </div>
      </div>
    </nav>
  );
};
