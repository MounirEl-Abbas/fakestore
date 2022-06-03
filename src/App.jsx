import { useEffect } from "react";
import { useDispatch } from "react-redux";
//React Router v6
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

//Components
import Navbar from "./components/Navbar";
import { getProducts } from "./features/products/productsSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* Sidebar */}
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />}>
            <Route path="/products/:productID" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
