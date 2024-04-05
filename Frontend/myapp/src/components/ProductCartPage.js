import React from 'react';

const ProductCart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => onRemoveFromCart(item)}>Remove</button>
            </div>
          ))}
          <p>Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}</p>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
