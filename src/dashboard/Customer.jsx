import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaShoppingCart, FaMoneyBillWave, FaCalendarAlt, FaSearch, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

function Customer() {
  const [medicines, setMedicines] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showCustomers, setShowCustomers] = useState(false);
  const [form, setForm] = useState({ name: '', product: '', billPaid: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/medicines');
      setMedicines(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching medicines:', err);
      setError('Error fetching medicines. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://pharma-backend-b08r.onrender.com/api/customers');
      setCustomers(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Error fetching customers. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear any previous error/success messages when user types
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim()) {
      setError('Customer name is required');
      return;
    }
    if (!form.product.trim()) {
      setError('Product name is required');
      return;
    }
    if (!form.billPaid || form.billPaid <= 0) {
      setError('Bill amount must be greater than 0');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const response = await axios.post('https://pharma-backend-b08r.onrender.com/api/customers', {
        name: form.name.trim(),
        product: form.product.trim(),
        billPaid: Number(form.billPaid)
      });

      setSuccess('Customer record added successfully!');
      setForm({ name: '', product: '', billPaid: '' });
      
      // Refresh customers list if it's currently shown
      if (showCustomers) {
        await fetchCustomers();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      console.error('Error adding customer:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add customer. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewCustomers = async () => {
    if (!showCustomers) {
      await fetchCustomers();
    }
    setShowCustomers(v => !v);
  };

  const filteredCustomers = customers.filter(cust =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !showCustomers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="page-title mb-1 text-3xl">Customer Management</h1>
          <p className="page-sub">Add and manage customer records</p>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="alert-error mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="alert-success mb-4">
            {success}
          </div>
        )}

        {/* Add Customer Form */}
        <div className="panel mb-8">
          <h2 className="section-title mb-6 flex items-center">
            <FaPlus className="mr-2 text-teal-600" />
            Add New Customer
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="field-label">
                  <FaUser className="inline mr-2 text-slate-400" />
                  Customer Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="field-input"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              
              <div>
                <label className="field-label">
                  <FaShoppingCart className="inline mr-2 text-slate-400" />
                  Product
                </label>
                <input
                  name="product"
                  value={form.product}
                  onChange={handleFormChange}
                  className="field-input"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div>
                <label className="field-label">
                  <FaMoneyBillWave className="inline mr-2 text-slate-400" />
                  Bill Amount (BDT)
                </label>
                <input
                  type="number"
                  name="billPaid"
                  value={form.billPaid}
                  onChange={handleFormChange}
                  className="field-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add Customer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* View Customers Section */}
        <div className="panel">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title flex items-center">
              <FaEye className="mr-2 text-emerald-600" />
              Customer Records
            </h2>
            <button
              className="btn-success"
              onClick={handleViewCustomers}
            >
              {showCustomers ? (
                <>
                  <FaEyeSlash />
                  Hide Customers
                </>
              ) : (
                <>
                  <FaEye />
                  View Customers
                </>
              )}
            </button>
          </div>

          {showCustomers && (
            <div>
              {/* Search Bar */}
              <div className="mb-5">
                <div className="relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="field-input pl-10"
                    placeholder="Search by customer name or product..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Customers Table */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-slate-500 mt-3">Loading customers...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Product</th>
                        <th>Bill Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="empty-cell">
                            {searchTerm ? 'No customers found matching your search.' : 'No customer records found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map(cust => (
                          <tr key={cust._id}>
                            <td className="font-medium text-slate-900">{cust.name}</td>
                            <td>{cust.product}</td>
                            <td className="font-semibold text-slate-900">BDT {cust.billPaid.toFixed(2)}</td>
                            <td className="text-slate-600 whitespace-nowrap">
                              <FaCalendarAlt className="mr-2 inline text-slate-400" />
                              {new Date(cust.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Summary */}
              {filteredCustomers.length > 0 && (
                <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-4">
                  <p className="text-sm text-teal-800">
                    Showing {filteredCustomers.length} customer record{filteredCustomers.length !== 1 ? 's' : ''}
                    {searchTerm && ` matching "${searchTerm}"`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customer;
