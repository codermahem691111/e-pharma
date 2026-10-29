import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDownload, FaSearch, FaFilter } from 'react-icons/fa';

function Transac() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      setError('Error fetching transactions');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.preparation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || transaction.date.includes(filterDate);
    return matchesSearch && matchesDate;
  });

  const exportTransactionPDF = (transaction) => {
    // This would integrate with jsPDF for detailed transaction export
    alert(`Exporting transaction for ${transaction.medicineName}`);
  };

  const getTotalRevenue = () => {
    return transactions.reduce((sum, transaction) => sum + transaction.totalPrice, 0);
  };

  const getTotalUnitsSold = () => {
    return transactions.reduce((sum, transaction) => sum + transaction.quantity, 0);
  };

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="panel max-w-6xl">
      <h1 className="page-title mb-8 text-center text-3xl">Transaction Records</h1>
      
      {error && <div className="alert-error mb-6 text-center">{error}</div>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-tile border-sky-100 bg-sky-50">
          <h3 className="stat-label text-sky-800">Total Transactions</h3>
          <p className="stat-value text-sky-700">{transactions.length}</p>
        </div>
        <div className="stat-tile border-emerald-100 bg-emerald-50">
          <h3 className="stat-label text-emerald-800">Total Units Sold</h3>
          <p className="stat-value text-emerald-700">{getTotalUnitsSold()}</p>
        </div>
        <div className="stat-tile border-indigo-100 bg-indigo-50">
          <h3 className="stat-label text-indigo-800">Total Revenue</h3>
          <p className="stat-value text-indigo-700">BDT {getTotalRevenue()}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="field-input pl-10"
            placeholder="Search by medicine name or preparation..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-slate-400" />
          <input
            type="date"
            className="field-input w-auto"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Medicine Name</th>
              <th>Preparation</th>
              <th>Quantity</th>
              <th>Price Per Unit</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={transaction._id || index}>
                  <td>
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="font-medium text-slate-900">
                    {transaction.medicineName}
                  </td>
                  <td>
                    {transaction.preparation}
                  </td>
                  <td className="text-center">
                    {transaction.quantity}
                  </td>
                  <td>
                    BDT {transaction.pricePerUnit}
                  </td>
                  <td className="font-semibold text-slate-900">
                    BDT {transaction.totalPrice}
                  </td>
                  <td>
                    <button
                      onClick={() => exportTransactionPDF(transaction)}
                      className="btn-primary btn-sm"
                    >
                      <FaDownload className="text-sm" />
                      Export
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-cell">
                  {transactions.length === 0 ? 'No transactions found' : 'No transactions match your search criteria'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export All Button */}
      {transactions.length > 0 && (
        <div className="mt-8 text-center">
          <button
            className="btn-primary mx-auto"
            onClick={() => alert('Exporting all transactions...')}
          >
            <FaDownload />
            Export All Transactions
          </button>
        </div>
      )}
    </div>
  );
}

export default Transac;
