import React from "react";
import { useSelector } from "react-redux";

const Product = ({
  title,
  price,
  description,
  category,
  image,
  rating: { rate, count },
}) => {
  const {
    filters: { defaultView },
  } = useSelector(store => store.products);
  return (
    <article
      className={`${
        defaultView ? "product-card default-layout" : "product-card grid-layout"
      }`}
      style={{ border: "1px solid red" }}>
      <h3>{title}</h3>
      <p>{price}</p>
      <p>{description}</p>
      <p>{category}</p>
      <p>
        Rate: {rate} -------------- Count: {count}
      </p>
      <img src={image} alt="" style={{ width: "100px", height: "100px" }} />
    </article>
  );
};

export default Product;
