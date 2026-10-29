import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function Sells() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [billItems, setBillItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleAddToBill = () => {
    if (!selectedMedicineId || quantity < 1) return;
    const med = medicines.find(m => m._id === selectedMedicineId);
    if (!med) return;
    if (quantity > med.unitsAvailable) {
      setError(`Only ${med.unitsAvailable} units available for ${med.name}`);
      return;
    }
    setBillItems(prev => {
      const existing = prev.find(item => item._id === med._id);
      if (existing) {
        return prev.map(item =>
          item._id === med._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...med, quantity }];
      }
    });
    setError('');
  };

  const handleRemoveFromBill = (id) => {
    setBillItems(prev => prev.filter(item => item._id !== id));
  };

  const getTotal = () => {
    return billItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  };

  const handleExportPDF = async () => {
    const doc = new jsPDF();
    doc.text('Smart Pharma Bill', 10, 10);
    let y = 20;
    billItems.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.name} (${item.preparation}) x ${item.quantity} = BDT ${item.pricePerUnit * item.quantity}`,
        10,
        y
      );
      y += 10;
    });
    doc.text(`Total: BDT ${getTotal()}`, 10, y + 10);
    doc.save('bill.pdf');

    // Save transaction records to backend
    try {
      const transactions = billItems.map(item => ({
        medicineName: item.name,
        preparation: item.preparation,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
        totalPrice: item.pricePerUnit * item.quantity
      }));

      await axios.post('https://pharma-backend-b08r.onrender.com/api/transactions/bulk', { transactions });

      // Update stock in backend
      await Promise.all(
        billItems.map(item =>
          axios.patch(`https://pharma-backend-b08r.onrender.com/api/medicines/${item._id}`, {
            unitsAvailable: item.unitsAvailable - item.quantity
          })
        )
      );
      
      setError('');
      alert('Bill exported and transaction recorded successfully!');
      // Optionally, refresh medicines
      fetchMedicines();
      setBillItems([]);
    } catch (err) {
      setError('Failed to save transaction or update stock after sale.');
    }
  };

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="panel max-w-3xl">
      <h1 className="page-title text-center">Medicine Billing</h1>
      {error && <div className="alert-error mb-4">{error}</div>}
      {/* Search box for filtering medicines */}
      <input
        type="text"
        className="field-input mb-4"
        placeholder="Search by name or preparation..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="mb-8 flex flex-col gap-3 md:flex-row">
        <select
          className="field-input md:w-1/2"
          value={selectedMedicineId}
          onChange={e => setSelectedMedicineId(e.target.value)}
        >
          <option value="">Select Medicine</option>
          {medicines
            .filter(med =>
              med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              med.preparation.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(med => (
              <option key={med._id} value={med._id}>
                {med.name} ({med.preparation}) - BDT {med.pricePerUnit} (Stock: {med.unitsAvailable})
              </option>
            ))}
        </select>
        <input
          type="number"
          min="1"
          className="field-input md:w-1/4"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
        />
        <button
          className="btn-primary"
          onClick={handleAddToBill}
        >
          Add
        </button>
      </div>
      {billItems.length > 0 && (
        <div className="mb-2">
          <h2 className="section-title mb-3">Bill Items</h2>
          <table className="data-table mb-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Preparation</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.preparation}</td>
                  <td>BDT {item.pricePerUnit}</td>
                  <td>{item.quantity}</td>
                  <td>BDT {item.pricePerUnit * item.quantity}</td>
                  <td>
                    <button
                      className="link-danger"
                      onClick={() => handleRemoveFromBill(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bill-total">Total: BDT {getTotal()}</div>
          <button
            className="btn-success"
            onClick={handleExportPDF}
          >
            Export Bill as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default Sells;
