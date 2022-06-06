import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { amount } = useSelector(store => store.cart);
  return (
    <nav style={{ display: "flex" }}>
      <div>Logo</div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        ##{amount}
      </div>
    </nav>
  );
};

export default Navbar;
