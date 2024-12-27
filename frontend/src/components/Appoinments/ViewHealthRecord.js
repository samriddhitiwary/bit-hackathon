import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { FaHeartbeat, FaWeightHanging, FaTint } from 'react-icons/fa'; // Icons
import Header from '../Header/Header';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './ViewHealthRecord.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ViewHealthRecord = () => {
  const [bpData, setBpData] = useState([]);
  const [sugarData, setSugarData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [bpValue, setBpValue] = useState('');
  const [sugarValue, setSugarValue] = useState('');
  const [weightValue, setWeightValue] = useState('');

  const userData = JSON.parse(sessionStorage.getItem('userdata'));
  const patientId = userData ? userData._id : null;

  const handleBloodPressureData = async () => {
    if (!patientId) {
      toast.error('No patient ID found!');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/healthrecord/getValueforBP', {
        date,
        bloodPressure: bpValue,
        patientId,
      });

      setBpData((prevData) => [
        ...prevData,
        { date: date.toLocaleDateString(), value: bpValue },
      ]);

      toast.success('Blood Pressure data recorded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to record Blood Pressure data');
    }
  };

  const handleSugarLevelData = async () => {
    if (!patientId) {
      toast.error('No patient ID found!');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/healthrecord/getValueforSugarLevel', {
        date,
        sugarlevel: sugarValue,
        patientId,
      });

      setSugarData((prevData) => [
        ...prevData,
        { date: date.toLocaleDateString(), value: sugarValue },
      ]);

      toast.success('Sugar Level data recorded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to record Sugar Level data');
    }
  };

  const handleWeightData = async () => {
    if (!patientId) {
      toast.error('No patient ID found!');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/healthrecord/getValueforWeight', {
        date,
        weight: weightValue,
        patientId,
      });

      setWeightData((prevData) => [
        ...prevData,
        { date: date.toLocaleDateString(), value: weightValue },
      ]);

      toast.success('Weight data recorded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to record Weight data');
    }
  };

  const generateChartData = (label, data, color) => ({
    labels: data.map((entry) => entry.date), 
    datasets: [
      {
        label,
        data: data.map((entry) => entry.value), 
        borderColor: color, // Use dynamic color for each graph
        backgroundColor: `${color}33`, // Lighter color for background
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      <Header />
      <br />
      <div className="container">
        <div className="card">
          <FaHeartbeat className="icon" />
          <Line data={generateChartData('Blood Pressure', bpData, 'rgba(255, 99, 132, 1)')} className="line-chart" />
          <div className="datepicker-wrapper">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
          <input
            type="number"
            placeholder="Enter BP Value"
            value={bpValue}
            onChange={(e) => setBpValue(e.target.value)}
          />
          <button onClick={handleBloodPressureData}>Record BP Data</button>
        </div>

        <div className="card">
          <FaTint className="icon" />
          <Line data={generateChartData('Sugar Level', sugarData, 'rgba(54, 162, 235, 1)')} className="line-chart" />
          <div className="datepicker-wrapper">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
          <input
            type="number"
            placeholder="Enter Sugar Level"
            value={sugarValue}
            onChange={(e) => setSugarValue(e.target.value)}
          />
          <button onClick={handleSugarLevelData}>Record Sugar Level</button>
        </div>

        <div className="card">
          <FaWeightHanging className="icon" />
          <Line data={generateChartData('Weight', weightData, 'rgba(75, 192, 192, 1)')} className="line-chart" />
          <div className="datepicker-wrapper">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
          <input
            type="number"
            placeholder="Enter Weight"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
          />
          <button onClick={handleWeightData}>Record Weight</button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ViewHealthRecord;
