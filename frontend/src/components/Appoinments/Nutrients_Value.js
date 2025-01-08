// import React, { useState } from 'react';
// import { Card, Button, Row, Col, Form, Table, Container } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import NutrientsData from './Nutrients_Data.json';
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import the styles

// const NutrientsValue = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [totalCalories, setTotalCalories] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [mealType, setMealType] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleIncrement = (name) => {
//     const updatedItems = selectedItems.map((item) =>
//       item.name === name ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setSelectedItems(updatedItems);
//   };

//   const handleDecrement = (name) => {
//     const updatedItems = selectedItems.map((item) =>
//       item.name === name && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setSelectedItems(updatedItems);
//   };

//   const handleCheckboxToggle = (item) => {
//     const exists = selectedItems.find((i) => i.name === item.name);
//     if (exists) {
//       setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
//     } else {
//       setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const handleClickCalories = () => {
//     const total = selectedItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);
//     setTotalCalories(total);
//   };

//   const filteredItems = NutrientsData.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const saveMealData = async () => {
//     const patientId = JSON.parse(sessionStorage.getItem('userdata'))?._id;

//     if (!patientId) {
//       toast.error('Patient ID not found. Please log in.'); // Show error toast
//       return;
//     }

//     const payload = {
//       patientId: patientId,
//       date: selectedDate,
//       mealtype: mealType,
//       meals: selectedItems.map((item) => ({
//         item: item.name,
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       const response = await fetch('http://localhost:8000/api/nutrients/meal-data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         toast.success('Meal data stored successfully!'); // Success toast
//       } else {
//         toast.error(`Error: ${result.message || 'Failed to save meal data.'}`); // Error toast
//       }
//     } catch (error) {
//       console.error('Error saving meal data:', error);
//       toast.error('An error occurred while saving meal data.'); // Error toast
//     }
//   };

//   return (
//     <div>
//       <h1>Nutrients Value</h1>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="dd/MM/yyyy"
//         />
//         <Form.Select
//           value={mealType}
//           onChange={(e) => setMealType(e.target.value)}
//           style={{ marginLeft: '10px', maxWidth: '200px' }}
//         >
//           <option value="">Select Meal Type</option>
//           <option value="breakfast">Breakfast</option>
//           <option value="lunch">Lunch</option>
//           <option value="snacks">Snacks</option>
//           <option value="dinner">Dinner</option>
//         </Form.Select>
//       </div>

//       <Form.Control
//         type="text"
//         placeholder="Search food items..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         style={{ marginBottom: '20px' }}
//       />

//       {selectedItems.length > 0 && (
//         <div style={{ marginBottom: '20px' }}>
//           <h2>Meal Type: {mealType || 'Not Selected'}</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Food Name</th>
//                 <th>Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedItems.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//       {selectedItems.length > 0 && (
//         <div>
//           <Button variant="success" onClick={handleClickCalories}>
//             Calculate Calories
//           </Button>
//           <h3>Total Calories: {totalCalories}</h3>
//         </div>
//       )}

//       <Button variant="primary" onClick={saveMealData}>
//         Save Meal Data
//       </Button>

//       <Container>
//         <Row>
//           {filteredItems.map((item, index) => (
//             <Col md={4} key={index}>
//               <Card
//                 style={{
//                   cursor: 'pointer',
//                   border: selectedItems.find((i) => i.name === item.name)
//                     ? '2px solid green'
//                     : '',
//                 }}
//               >
//                 <Card.Img variant="top" src={item.image_url} />
//                 <Card.Body>
//                   <Form.Check
//                     type="checkbox"
//                     checked={!!selectedItems.find((i) => i.name === item.name)}
//                     onChange={() => handleCheckboxToggle(item)}
//                     label={item.name}
//                   />
//                   {selectedItems.find((i) => i.name === item.name) && (
//                     <>
//                       <Button variant="primary" onClick={() => handleDecrement(item.name)}>
//                         -
//                       </Button>
//                       <span> {selectedItems.find((i) => i.name === item.name)?.quantity || 0} </span>
//                       <Button variant="primary" onClick={() => handleIncrement(item.name)}>
//                         +
//                       </Button>
//                     </>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       <ToastContainer /> {/* Toast container to display toasts */}
//     </div>
//   );
// };

// export default NutrientsValue;




import React, { useState } from 'react';
import { Card, Button, Row, Col, Form, Table, Container } from 'react-bootstrap';
import { FaPlus, FaMinus, FaCheck } from 'react-icons/fa'; // Import icons from react-icons
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NutrientsData from './Nutrients_Data.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NutrientsValue = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleIncrement = (name) => {
    const updatedItems = selectedItems.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSelectedItems(updatedItems);
  };

  const handleDecrement = (name) => {
    const updatedItems = selectedItems.map((item) =>
      item.name === name && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setSelectedItems(updatedItems);
  };

  const handleCheckboxToggle = (item) => {
    const exists = selectedItems.find((i) => i.name === item.name);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleClickCalories = () => {
    const total = selectedItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);
    setTotalCalories(total);
  };

  const filteredItems = NutrientsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveMealData = async () => {
    const patientId = JSON.parse(sessionStorage.getItem('userdata'))?._id;

    if (!patientId) {
      toast.error('Patient ID not found. Please log in.');
      return;
    }

    const payload = {
      patientId: patientId,
      date: selectedDate,
      mealtype: mealType,
      meals: selectedItems.map((item) => ({
        item: item.name,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch('http://localhost:8000/api/nutrients/meal-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Meal data stored successfully!');
      } else {
        toast.error(`Error: ${result.message || 'Failed to save meal data.'}`);
      }
    } catch (error) {
      console.error('Error saving meal data:', error);
      toast.error('An error occurred while saving meal data.');
    }
  };

  return (
    <div>
      <h1>Nutrients Value</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <Form.Select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          style={{ marginLeft: '10px', maxWidth: '200px' }}
        >
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </Form.Select>
      </div>

      <Form.Control
        type="text"
        placeholder="Search food items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {selectedItems.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Meal Type: {mealType || 'Not Selected'}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {selectedItems.length > 0 && (
        <div>
          <Button variant="success" onClick={handleClickCalories}>
            Calculate Calories
          </Button>
          <h3>Total Calories: {totalCalories}</h3>
        </div>
      )}

      <Button variant="primary" onClick={saveMealData}>
        Save Meal Data
      </Button>

      <Container>
        <Row className="food-container">
          {filteredItems.map((item, index) => (
            <Col md={4} key={index}>
              <Card
                style={{
                  cursor: 'pointer',
                  border: selectedItems.find((i) => i.name === item.name)
                    ? '2px solid green'
                    : '',
                  transition: 'transform 0.2s ease-in-out', // Add animation for hover
                }}
                className="card"
              >
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Form.Check
                    type="checkbox"
                    checked={!!selectedItems.find((i) => i.name === item.name)}
                    onChange={() => handleCheckboxToggle(item)}
                    label={item.name}
                  />
                  {selectedItems.find((i) => i.name === item.name) && (
                    <>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDecrement(item.name)}
                        style={{ margin: '5px' }}
                      >
                        <FaMinus /> {/* Decrement icon */}
                      </Button>
                      <span> {selectedItems.find((i) => i.name === item.name)?.quantity || 0} </span>
                      <Button
                        variant="outline-success"
                        onClick={() => handleIncrement(item.name)}
                        style={{ margin: '5px' }}
                      >
                        <FaPlus /> {/* Increment icon */}
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default NutrientsValue;
