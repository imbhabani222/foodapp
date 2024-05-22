import React, { useRef, useState, useEffect } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const { _id, img, name, options } = props.filterData;

  const filterOptions = options[0];
  const priceOptions = Object.keys(filterOptions);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const finalPrice = qty * parseInt(filterOptions[size]);

  const handelAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item._id === _id) {
        food = item;
        break;
      }
    }
    console.log(food);
    if (food.length !== 0) {
      if (food.size === size) {
        console.log(size);
        await dispatch({
          type: "UPDATE",
          _id: _id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          _id: _id,
          name: name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: img,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      _id: _id,
      name: name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: img,
    });
  };
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">This is some important text</p>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions?.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handelAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
