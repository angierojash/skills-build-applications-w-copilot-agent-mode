import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching users from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Users data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">Users</h2>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <p className="text-muted text-center">No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id || index}>
                      <td>{index + 1}</td>
                      <td><strong>{user.username}</strong></td>
                      <td><a href={`mailto:${user.email}`} className="link-primary">{user.email}</a></td>
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

export default Users;
