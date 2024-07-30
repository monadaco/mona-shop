import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct } from "../state/products";

export const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const item = useSelector((state) => (id ? state.products.products.find((p) => p.id === Number(id)) : null));
  const imageRef = useRef();

  const displayPhoto = (image) => (typeof image === "string" ? image : URL.createObjectURL(image));

  const setForm = ({ title, price, description, image }) => {
    setTitle(title);
    setPrice(price);
    setDescription(description);
    setPhoto(image);
  };

  const onSubmit = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    form.append("image", photo);
    await dispatch(editProduct(id, form));
    reset();
  };

  const reset = () => {
    setForm({ title: "", price: 0, description: "", image: undefined });
    navigate("/admin");
  };

  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      setForm({ title: "", price: 0, description: "", image: undefined });
    }
  }, [item]);

  return (
    <div className="flex flex-col justify-center px-6 w-full text-gray-800">
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-gray-700 mt-8">
            {id ? `Edit Product (id: ${id})` : "Create a new product"}
          </h2>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="title" className="text-sm font-semibold leading-6 ">
            Title
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="price" className="text-sm font-semibold leading-6 ">
            Price (USD)
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="number"
                name="price"
                id="username"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="description" className="text-sm font-semibold leading-6 ">
            Description
          </label>
          <div className="mt-2">
            <textarea
              name="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md px-1 border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">Write a few sentences about the product.</p>
        </div>

        <div className="col-span-full">
          <div className="flex justify-between">
            <div>
              <label htmlFor="photo" className="text-sm font-semibold leading-6">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={imageRef}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && (
                  <img className="h-24 w-24 flex-none rounded-md bg-gray-50" src={displayPhoto(photo ?? "")} alt="" />
                )}
                <button
                  onClick={() => imageRef.current.click()}
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {photo ? "Change" : "Upload"}
                </button>
              </div>
            </div>
            <div className="flex gap-x-5">
              <button
                onClick={reset}
                to="/admin"
                type="button"
                className="self-center  rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={!photo || !title || !description || !price}
                onClick={onSubmit}
                type="button"
                className="self-center rounded-md  bg-slate-800 px-10 py-1.5 text-sm font-semibold text-slate-50 shadow-sm  hover:bg-slate-950 disabled:bg-slate-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
