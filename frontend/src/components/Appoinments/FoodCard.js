import React, { useState } from 'react';
import './FoodCard.css';  // Import the external CSS file

const FoodCard = ({ food, onSelect, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
    onUpdateQuantity(food.id, quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onUpdateQuantity(food.id, quantity - 1);
    }
  };

  const handleSelect = () => {
    onSelect(food.id, quantity);
  };

  return (
    <div className="card" onClick={handleSelect}>
      <img src={food.image_url} alt={food.name} />
      <h3>{food.name}</h3>
      <p>{food.serving_size}</p>
      <div>
        <button onClick={decrement}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default FoodCard;
