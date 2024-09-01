import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import CustomerProfileDashboard from "../Components/CustomerProfileDashboard";

const PredictionPage = () => {
  const [file, setFile] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [predictions, setPredictions] = useState(null);
  // const navigate = useNavigate()


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleFileSubmit = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("customer_id", customerId);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPredictions(response.data);

    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };
  const handleBack = () => {
    // Reset form and prediction state
    setFile(null);
    setCustomerId('');
    setPredictions(null);
    document.getElementById("fileInput").value = null;
  }


  return (
    <div className="min-h-screen bg-customBlue flex flex-col items-center justify-center">
      <h1 className="text-3xl text-5 font-bold mb-8">Customer Retention Prediction</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fileInput"
          >
            Upload CSV File
          </label>
          <input
            id="fileInput"
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
            
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="customerId"
          >
            Enter Customer ID
          </label>
          <input
            id="customerId"
            type="text"
            value={customerId}
            onChange={handleCustomerIdChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleFileSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Predict
          </button>
        </div>
      </div>
      {predictions && (
        <div className="mt-4">
          (<CustomerProfileDashboard data={predictions} onBack={handleBack} />)
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
