import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../state/orders";
import {displayPrice} from "../helpers";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products ?? []);

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-700 my-8">Products</h2>
      <div className="mx-auto pb-8 max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...products]
            .sort((a, b) => a.id - b.id)
            .map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-h-1 relative aspect-w-1 w-full overflow-hidden rounded-lg bg-white">
                  <button className="invisible group-hover:visible  z-10 absolute left-24 top-32 m-auto rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => dispatch(addItem({id: product.id}))}>
                    Add to cart
                  </button>
                  <img src={product.image} alt={product.description} className=" h-72 w-full object-cover object-center group-hover:opacity-75" />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 font-semibold">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-500 truncate leading-5">{product.description}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{displayPrice(product.price)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
