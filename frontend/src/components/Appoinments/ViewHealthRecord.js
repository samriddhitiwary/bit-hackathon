import React, { useState, useEffect } from 'react';
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
import { FaHeartbeat, FaWeightHanging, FaTint } from 'react-icons/fa';
import Header from '../Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewHealthRecord.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ViewHealthRecord = () => {
  const [date, setDate] = useState(new Date());
  const [bpValue, setBpValue] = useState('');
  const [bpData, setBpData] = useState([]);
  const [sugarValue, setSugarValue] = useState('');
  const [sugarData, setSugarData] = useState([]);
  const [weightValue, setWeightValue] = useState('');
  const [weightData, setWeightData] = useState([]);

  const userData = JSON.parse(sessionStorage.getItem('userdata'));
  const patientId = userData ? userData._id : null;

  useEffect(() => {
    if (patientId) {
      fetchInitialData();
    }
  }, [patientId]);

  const fetchInitialData = async () => {
    try {
      const bpResponse = await axios.get(
        `http://localhost:8000/api/healthrecord/getAllBPRecordsbyId/${patientId}`
      );
      setBpData(
        bpResponse.data.slice(-5).map((record) => ({
          date: new Date(record.date).toLocaleDateString(),
          value: record.bloodPressure,
        }))
      );

      const sugarResponse = await axios.get(
        `http://localhost:8000/api/healthrecord/getAll_SugarLevel_RecordsbyId/${patientId}`
      );
      setSugarData(
        sugarResponse.data.slice(-5).map((record) => ({
          date: new Date(record.date).toLocaleDateString(),
          value: record.sugarlevel,
        }))
      );

      const weightResponse = await axios.get(
        `http://localhost:8000/api/healthrecord/getAll_WeightLevel_RecordsbyId/${patientId}`
      );
      setWeightData(
        weightResponse.data.slice(-5).map((record) => ({
          date: new Date(record.date).toLocaleDateString(),
          value: record.weight,
        }))
      );
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch initial data');
    }
  };

  const handleSubmission = async (api, value, setValue, data, setData, label) => {
    if (!patientId) {
      toast.error('No patient ID found!');
      return;
    }

    try {
      await axios.post(api, { date, [label]: value, patientId });

      const newRecord = { date: date.toLocaleDateString(), value };
      const updatedData = [...data, newRecord].slice(-5);

      setData(updatedData);
      toast.success(`${label} data recorded successfully!`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to record ${label} data`);
    }
  };

  const generateChartData = (label, data, color) => ({
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label,
        data: data.map((entry) => entry.value),
        borderColor: color,
        backgroundColor: `${color}33`,
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
          <div className="icon-wrapper">
            <FaHeartbeat className="icon" />
          </div>
          <Line
            data={generateChartData('Blood Pressure', bpData, 'rgba(255, 99, 132, 1)')}
            className="line-chart"
          />
          <div className="datepicker-wrapper">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
          <input
            type="number"
            placeholder="Enter Blood Pressure"
            value={bpValue}
            onChange={(e) => setBpValue(e.target.value)}
          />
          <button
            onClick={() =>
              handleSubmission(
                'http://localhost:8000/api/healthrecord/getValueforBP',
                bpValue,
                setBpValue,
                bpData,
                setBpData,
                'bloodPressure'
              )
            }
          >
            Record Blood Pressure
          </button>
        </div>

        <div className="card">
          <div className="icon-wrapper">
            <FaTint className="icon" />
          </div>
          <Line
            data={generateChartData('Sugar Level', sugarData, 'rgba(54, 162, 235, 1)')}
            className="line-chart"
          />
          <div className="datepicker-wrapper">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
          <input
            type="number"
            placeholder="Enter Sugar Level"
            value={sugarValue}
            onChange={(e) => setSugarValue(e.target.value)}
          />
          <button
            onClick={() =>
              handleSubmission(
                'http://localhost:8000/api/healthrecord/getValueforSugarLevel',
                sugarValue,
                setSugarValue,
                sugarData,
                setSugarData,
                'sugarlevel'
              )
            }
          >
            Record Sugar Level
          </button>
        </div>

        <div className="card">
          <div className="icon-wrapper">
            <FaWeightHanging className="icon" />
          </div>
          <Line
            data={generateChartData('Weight', weightData, 'rgba(75, 192, 192, 1)')}
            className="line-chart"
          />
          <div className="datepicker-wrapper">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
          <input
            type="number"
            placeholder="Enter Weight"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
          />
          <button
            onClick={() =>
              handleSubmission(
                'http://localhost:8000/api/healthrecord/getValueforWeight',
                weightValue,
                setWeightValue,
                weightData,
                setWeightData,
                'weight'
              )
            }
          >
            Record Weight
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewHealthRecord;
