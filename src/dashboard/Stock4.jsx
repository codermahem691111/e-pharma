import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stock4() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRareMedicines();
  }, []);

  const fetchRareMedicines = async () => {
    try {
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/medicines');
      // Filter medicines by type to show only rare medicines
      const rareMedicines = res.data.filter(med => med.type === 'rareMedicine');
      setMedicines(rareMedicines);
    } catch (err) {
      console.error('Error fetching rare medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this rare medicine?');
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://pharma-backend-b08r.onrender.com/api/medicines/${id}`);
      if (res.status === 200) {
        setMedicines(prev => prev.filter(med => med._id !== id));
        alert('Rare Medicine deleted successfully!');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete rare medicine');
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.preparation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.rarityLevel || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.specialHandling || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="panel panel-scroll max-w-6xl">
      <h1 className="page-title">Rare Medicine Stock</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search rare medicines..."
        className="field-input mb-5"
      />

      {filteredMedicines.length === 0 ? (
        <div className="empty-state">No rare medicines found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Preparation</th>
              <th>Category</th>
              <th>Rarity Level</th>
              <th>Special Handling</th>
              <th>Price</th>
              <th>Units</th>
              <th>Expiry</th>
              <th>Clinical Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map(med => (
              <tr key={med._id}>
                <td className="font-medium">{med.name}</td>
                <td>{med.preparation}</td>
                <td>{med.category || '-'}</td>
                <td><span className="badge badge-rose">{med.rarityLevel || '-'}</span></td>
                <td><span className="badge badge-amber">{med.specialHandling || '-'}</span></td>
                <td className="font-semibold">BDT {med.pricePerUnit}</td>
                <td>{med.unitsAvailable}</td>
                <td>{new Date(med.expiryDate).toLocaleDateString()}</td>
                <td className="max-w-xs truncate text-slate-500" title={med.clinicalNotes}>
                  {med.clinicalNotes || '-'}
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

export default Stock4;
