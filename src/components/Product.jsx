import React from "react";

const Product = ({
  title,
  price,
  description,
  category,
  image,
  rating: { rate, count },
}) => {
  return (
    <article className="product-card" style={{ border: "1px solid red" }}>
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
