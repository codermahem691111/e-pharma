import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stock2() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElderCareMedicines();
  }, []);

  const fetchElderCareMedicines = async () => {
    try {
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/medicines');
      // Filter medicines by type to show only elder care medicines
      const elderCareMedicines = res.data.filter(med => med.type === 'elderCare');
      setMedicines(elderCareMedicines);
    } catch (err) {
      console.error('Error fetching elder care medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this elder care medicine?');
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://pharma-backend-b08r.onrender.com/api/medicines/${id}`);
      if (res.status === 200) {
        setMedicines(prev => prev.filter(med => med._id !== id));
        alert('Elder Care Medicine deleted successfully!');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete elder care medicine');
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.preparation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.ageGroup || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="panel panel-scroll max-w-6xl">
      <h1 className="page-title">Elder Care Medicine Stock</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search elder care medicine..."
        className="field-input mb-5"
      />

      {filteredMedicines.length === 0 ? (
        <div className="empty-state">No elder care medicines found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Preparation</th>
              <th>Category</th>
              <th>Age Group</th>
              <th>Price</th>
              <th>Units</th>
              <th>Expiry</th>
              <th>Special Instructions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map(med => (
              <tr key={med._id}>
                <td className="font-medium">{med.name}</td>
                <td>{med.preparation}</td>
                <td>{med.category || '-'}</td>
                <td><span className="badge badge-sky">{med.ageGroup || '-'}</span></td>
                <td className="font-semibold">BDT {med.pricePerUnit}</td>
                <td>{med.unitsAvailable}</td>
                <td>{new Date(med.expiryDate).toLocaleDateString()}</td>
                <td className="max-w-xs truncate text-slate-500" title={med.specialInstructions}>
                  {med.specialInstructions || '-'}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(med._id)}
                    className="link-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Stock2;
