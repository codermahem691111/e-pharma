import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      setError('Error fetching medicines');
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.preparation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="panel panel-scroll max-w-5xl">
      <h2 className="page-title">Medicine Stock & Expiry</h2>
      {error && <div className="alert-error mb-4">{error}</div>}
      <input
        type="text"
        className="field-input mb-5"
        placeholder="Search by name, preparation, or category..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Preparation</th>
            <th>Category</th>
            <th>Units Available</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.length === 0 ? (
            <tr><td colSpan="5" className="empty-cell">No medicines found.</td></tr>
          ) : (
            filteredMedicines.map(med => (
              <tr key={med._id}>
                <td>{med.name}</td>
                <td>{med.preparation}</td>
                <td>{med.category || '-'}</td>
                <td>{med.unitsAvailable}</td>
                <td>{new Date(med.expiryDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Medicine;
