import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveId } from "../../Slice/Cart.js";

const Cart = () => {
  const dispatch = useDispatch();

  // Access global cart items
  const cartItems = useSelector((state) => state.cart.cartItem);

  const handleRemove = (id) => {
    dispatch(RemoveId(id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart</h2>

      {cartItems.length === 0 && <p>No items in cart</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{item.courseName}</h3>
              <p>{item.courseDescription}</p>
            </div>

            <button
              onClick={() => handleRemove(item._id)}
              style={{
                padding: "6px 10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

