import React, { useState, useEffect } from 'react';
import AddUniversityForm from './AddUniversityForm';
import axios from 'axios';

const ApiKeyGate = () => {
  const [userKey, setUserKey] = useState('');
  const [backendKey, setBackendKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch key from backend when component mounts
    const fetchKey = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/getApiKey'); // Your actual endpoint
        setBackendKey(res.data.apiKey);
        const storedKey = localStorage.getItem('api_keys');

        if (storedKey && storedKey === res.data.apiKey) {
          setHasAccess(true);
        }
      } catch (err) {
        console.error('Error fetching API key from backend', err);
        setError('Failed to load API key from backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchKey();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userKey.trim() === backendKey) {
      localStorage.setItem('api_keys', userKey.trim());
      setHasAccess(true);
    } else {
      alert('Invalid API key. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (hasAccess) {
    return <AddUniversityForm />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">Enter API Key to Access Dashboard</h2>
      <input
        type="text"
        value={userKey}
        onChange={(e) => setUserKey(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter your API key"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Verify & Access
      </button>
    </form>
  );
};

export default ApiKeyGate;
