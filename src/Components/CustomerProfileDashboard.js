import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerProfileDashboard = ({ data, onBack }) => {
  const { customer_profile, customer_segment, left_status, recommendation } = data;
  const navigate = useNavigate()

  const formatRecommendation = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</p>;
      } else if (line.includes('**')) {
        return (
          <p key={index} className="mt-2">
            {line.split('**').map((part, i) =>
              i % 2 === 0 ? part : <strong key={i}>{part}</strong>
            )}
          </p>
        );
      } else if (line.startsWith('* ')) {
        return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
      } else if (line.match(/^\d+\./)) {
        return <li key={index} className="ml-6 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mt-2">{line}</p>;
      }
    });
  };



  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4b6cb7] to-[#293e69] text-white p-5">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Customer Retention Analysis</h1>

        <div className="overflow-x-auto mb-6 border border-gray-300 rounded">
          <table className="w-full bg-[#34495e] text-[#ecf0f1]">
            <tbody>
              <tr>
                <th className="bg-[#7994ce] p-2 text-left border-b border-gray-300">Customer Status</th>
                <td className="p-2 text-black bg-white border-b border-gray-300">{left_status}</td>
              </tr>
              <tr>
                <th className="bg-[#7994ce] p-2 text-left">Customer Segment</th>
                <td className="p-2 text-black bg-white">{customer_segment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4">Customer Profile</h2>
        <div className="overflow-x-auto mb-6 border border-gray-300 rounded">
          <table className="w-full bg-[#34495e] text-[#ecf0f1]">
            <thead>
              <tr>
                {Object.keys(customer_profile).map((key) => (
                  <th key={key} className="bg-[#7994ce] p-2 text-left border-b border-r border-gray-300">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(customer_profile).map((value, index) => (
                  <td key={index} className="p-2 align-top border-r border-gray-300 text-black bg-white">{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4">Retention Recommendation</h2>
        <div className="bg-white text-black text-lg p-4 rounded mb-6 border border-gray-300 overflow-auto">
          {formatRecommendation(recommendation)}
        </div>
        <div className='flex p-4 gap-7'>
          <button onClick={onBack}
            className="bg-[#2980b9] hover:bg-[#3498db] text-white font-bold py-2 px-4 rounded">
            Go back
          </button>


          <button onClick={() => navigate('/dashboard')}
            className="bg-[#2980b9] hover:bg-[#3498db] text-white font-bold py-2 px-4 rounded">
            Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerProfileDashboard;