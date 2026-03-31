import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Teams data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">Teams</h2>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <p className="text-muted text-center">No teams found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team._id || index}>
                      <td>{index + 1}</td>
                      <td><strong>{team.name}</strong></td>
                      <td>
                        {Array.isArray(team.members)
                          ? team.members.map((member, i) => (
                              <span key={i} className="badge bg-secondary me-1">{member}</span>
                            ))
                          : team.members}
                      </td>
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

export default Teams;
