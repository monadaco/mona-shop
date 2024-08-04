import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./header";
import { Admin } from "./admin";
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
          <Route path="/:id" element={<Admin />} />
          <Route path="/" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
