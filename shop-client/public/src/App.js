import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./header";
import { Products } from "./products";
import { Admin } from "./admin";
import { Checkout } from "./checkout";
import { useEffect } from "react";
import { fetchProducts } from "./state/products";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <div className="mx-10 h-full">
        <Routes>
          <Route path="/admin/" element={<Admin />} />
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
