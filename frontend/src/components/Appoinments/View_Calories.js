import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ViewCalories = () => {
  const [meals, setMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const API_URL = (date) =>
    `http://localhost:8000/api/Nutrients/get-all-meals/6768ea92a6fd51794462a009/${date}T00:00:00.000+00:00`;

  const fetchMeals = async (date) => {
    try {
      const response = await axios.get(API_URL(date));
      const data = response.data;

      if (data.length === 0) {
        setMeals([]);
        setTotalCalories(0);
        setChartData(null);
        return;
      }

      // Calculate total calories
      const total = data.reduce((sum, meal) => sum + meal.calories, 0);

      // Prepare data for chart
      const chartData = {
        labels: data.map((meal) => meal.mealType), // e.g., Breakfast, Lunch, etc.
        datasets: [
          {
            label: "Calories",
            data: data.map((meal) => meal.calories),
            backgroundColor: data.map((meal) => {
              if (meal.calories < 500) return "green";
              if (meal.calories <= 700) return "yellow";
              return "red";
            }),
          },
        ],
      };

      setMeals(data);
      setTotalCalories(total);
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching meals:", error.message);
    }
  };

  useEffect(() => {
    if (selectedDate) fetchMeals(selectedDate);
  }, [selectedDate]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Calorie Tracker</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label htmlFor="date">Select Date: </label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: "5px", borderRadius: "5px" }}
        />
      </div>

      {meals.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          {selectedDate
            ? "No meals found for the selected date."
            : "Please select a date to view calorie details."}
        </p>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <h3>Meals</h3>
            <ul>
              {meals.map((meal) => (
                <li key={meal._id}>
                  <strong>{meal.mealType}:</strong> {meal.calories} calories
                </li>
              ))}
            </ul>
            <h3>Total Calories: {totalCalories}</h3>
          </div>

          <div>
            <h3>Calorie Chart</h3>
            <Bar
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    display: true,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCalories;
