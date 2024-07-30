import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../state/products";

const EditIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const ListItem = ({ id, title, description, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteItem = async () => {
    await dispatch(deleteProduct(id));
    navigate("/admin");
  };
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={image} alt="" />
        <Link to={`/${id}`} className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-700 flex gap-x-2 items-center hover:underline">
            {title}
            <EditIcon className="stroke-gray-400 h-4 w-4" />
          </p>
          <p className="mt-1 truncate text-xs text-ellipsis overflow-hidden leading-5 text-gray-500">{description}</p>
        </Link>
      </div>
      <button
        onClick={deleteItem}
        className="self-center  rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Delete
      </button>
    </li>
  );
};

export const ProductLists = () => {
  const products = useSelector((state) => state.products.products ?? []);
  return (
    <div className="w-1/3 ">
      <h2 className="text-lg font-bold text-gray-700 my-8">Products</h2>
      <ul style={{ height: "75vh" }} className="divide-y divide-gray-200 overflow-y-auto px-6">
        {products.map((product) => (
          <ListItem key={product.id} {...product} />
        ))}
        {products.length === 0 ? <p className="mt-3 text-sm leading-6 text-gray-500">No products</p> : ""}
      </ul>
    </div>
  );
};
