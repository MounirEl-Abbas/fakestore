import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(store => store.cart);

  if (cart.amount < 1) return <h3>No items in cart</h3>;

  return (
    <div className="cart-container">
      {cart.cartItems.map(item => {
        console.log("item", item);
        const { id, title, image, price } = item;
        return (
          <article key={id} className="cart-item">
            <img src={image} alt="" />
            <h3>{title}</h3>
            <p>{price}</p>
            <button>remove</button>
          </article>
        );
      })}

      <div>Total: {cart.total}</div>
    </div>
  );
};

export default Cart;
