import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:8000/recommend/${userId}?top_n=5`);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Bookie</h1>
      <form onSubmit={fetchRecommendations} style={{ marginBottom: '20px' }}>
        <input 
          type="number" 
          placeholder="Enter User ID (1-1000)" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Get Recommendations
        </button>
      </form>
      
      {loading && <p>Loading recommendations...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {recommendations.length > 0 && (
        <div>
          <h2>Top Recommendations for User {userId}</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {recommendations.map((reco, index) => (
              <li key={index} style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '4px' }}>
                <strong style={{ fontSize: '18px' }}>Book ID: {reco.book_id}</strong>
                <p style={{ margin: '5px 0 0 0', color: '#555' }}>Predicted Rating: {reco.predicted_rating.toFixed(2)} / 5.0</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
