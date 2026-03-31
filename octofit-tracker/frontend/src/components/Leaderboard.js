import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(results);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <h2 className="mb-0">Leaderboard</h2>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <p className="text-muted text-center">No leaderboard data found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">User</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry._id || index}>
                      <td>
                        {index === 0 && <span className="badge bg-warning text-dark">🥇</span>}
                        {index === 1 && <span className="badge bg-secondary">🥈</span>}
                        {index === 2 && <span className="badge bg-danger">🥉</span>}
                        {index > 2 && <span>{index + 1}</span>}
                      </td>
                      <td>{entry.user}</td>
                      <td><strong>{entry.score}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
