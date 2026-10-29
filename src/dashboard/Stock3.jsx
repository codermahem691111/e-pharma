import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stock3() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMomBabyCareProducts();
  }, []);

  const fetchMomBabyCareProducts = async () => {
    try {
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/medicines');
      // Filter medicines by type to show only mom and baby care products
      const momBabyCareProducts = res.data.filter(med => med.type === 'momBabyCare');
      setMedicines(momBabyCareProducts);
    } catch (err) {
      console.error('Error fetching mom & baby care products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this mom & baby care product?');
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://pharma-backend-b08r.onrender.com/api/medicines/${id}`);
      if (res.status === 200) {
        setMedicines(prev => prev.filter(med => med._id !== id));
        alert('Mom & Baby Care Product deleted successfully!');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete mom & baby care product');
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.preparation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.targetAge || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="panel panel-scroll max-w-6xl">
      <h1 className="page-title">Mom & Baby Care Product Stock</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search mom & baby care products..."
        className="field-input mb-5"
      />

      {filteredMedicines.length === 0 ? (
        <div className="empty-state">No mom & baby care products found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Preparation</th>
              <th>Category</th>
              <th>Target Age</th>
              <th>Price</th>
              <th>Units</th>
              <th>Expiry</th>
              <th>Safety Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map(med => (
              <tr key={med._id}>
                <td className="font-medium">{med.name}</td>
                <td>{med.preparation}</td>
                <td>{med.category || '-'}</td>
                <td><span className="badge badge-pink">{med.targetAge || '-'}</span></td>
                <td className="font-semibold">BDT {med.pricePerUnit}</td>
                <td>{med.unitsAvailable}</td>
                <td>{new Date(med.expiryDate).toLocaleDateString()}</td>
                <td className="max-w-xs truncate text-slate-500" title={med.safetyNotes}>
                  {med.safetyNotes || '-'}
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

export default Stock3;
