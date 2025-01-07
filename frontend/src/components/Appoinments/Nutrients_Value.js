import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NutrientsData from './Nutrients_Data.json'; // Assuming the JSON file is in the same directory

const NutrientsValue = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleIncrement = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity += 1;
    setSelectedItems(updatedItems);
  };

  const handleDecrement = (index) => {
    const updatedItems = [...selectedItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    }
    setSelectedItems(updatedItems);
  };

  const handleSelectItem = (item) => {
    if (!selectedItems.find((i) => i.name === item.name)) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleClickCalories = () => {
    const total = selectedItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);
    setTotalCalories(total);
  };

  const saveSelectedItemsToDatabase = () => {
    axios.post('/api/save-items', selectedItems)
      .then(response => {
        console.log('Items saved successfully', response);
      })
      .catch(error => {
        console.error('Error saving items', error);
      });
  };

  return (
    <div>
      <h1>Nutrients Value</h1>
      <Row>
        {NutrientsData.map((item, index) => (
          <Col md={4} key={index}>
            <Card onClick={() => handleSelectItem(item)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={item.image_url} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Calories: {item.calories} per {item.serving_size}</Card.Text>
                <Button variant="primary" onClick={(e) => { e.stopPropagation(); handleDecrement(index); }}>-</Button>
                <span> {selectedItems.find(i => i.name === item.name)?.quantity || 0} </span>
                <Button variant="primary" onClick={(e) => { e.stopPropagation(); handleIncrement(index); }}>+</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <Button variant="success" onClick={handleClickCalories}>Calculate Calories</Button>
        <h3>Total Calories: {totalCalories}</h3>
      </div>
      <div>
        <Button variant="primary" onClick={saveSelectedItemsToDatabase}>Save to Database</Button>
      </div>
    </div>
  );
};

export default NutrientsValue;
