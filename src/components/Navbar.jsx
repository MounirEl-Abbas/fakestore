import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
