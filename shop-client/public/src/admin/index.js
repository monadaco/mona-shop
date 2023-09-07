import { Form } from "./form";
import { ProductLists } from "./product-lists";

export const Admin = () => {
  return (
    <div className="flex w-full gap-x-10 justify-start items-start">
      <ProductLists />
      <Form />
    </div>
  );
};
