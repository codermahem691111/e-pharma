import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const rareMedicineCategories = [
  {
    label: 'Oncology',
    options: [
      'Chemotherapy Drugs',
      'Targeted Therapy',
      'Immunotherapy',
      'Hormone Therapy',
      'Supportive Care',
    ],
  },
  {
    label: 'Rare Diseases',
    options: [
      'Genetic Disorders',
      'Metabolic Disorders',
      'Neuromuscular Diseases',
      'Autoimmune Disorders',
      'Lysosomal Storage Diseases',
    ],
  },
  {
    label: 'Transplant Medications',
    options: [
      'Immunosuppressants',
      'Anti-rejection Drugs',
      'Graft vs Host Disease',
      'Transplant Support',
    ],
  },
  {
    label: 'Specialty Neurology',
    options: [
      'Multiple Sclerosis',
      'Parkinson\'s Disease',
      'Huntington\'s Disease',
      'Rare Epilepsy',
      'Neurodegenerative',
    ],
  },
  {
    label: 'Hematology',
    options: [
      'Hemophilia Treatments',
      'Sickle Cell Disease',
      'Rare Blood Disorders',
      'Clotting Factors',
    ],
  },
  {
    label: 'Orphan Drugs',
    options: [
      'FDA Orphan Designated',
      'EU Orphan Designated',
      'Rare Cancer Drugs',
      'Ultra-rare Conditions',
    ],
  },
];

function RareMed() {
  const [medicine, setMedicine] = useState({
    name: '',
    preparation: '',
    category: '',
    pricePerUnit: '',
    unitsAvailable: '',
    expiryDate: '',
    rarityLevel: '',
    specialHandling: '',
    clinicalNotes: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setMedicine((prev) => ({ ...prev, category }));
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add type field to identify this as rare medicine
      const rareMedicine = { ...medicine, type: 'rareMedicine' };
      await axios.post('https://pharma-backend-b08r.onrender.com/api/medicines', rareMedicine);
      alert('Rare Medicine added successfully!');
      setMedicine({
        name: '',
        preparation: '',
        category: '',
        pricePerUnit: '',
        unitsAvailable: '',
        expiryDate: '',
        rarityLevel: '',
        specialHandling: '',
        clinicalNotes: '',
      });
    } catch (error) {
      console.error('Error adding rare medicine:', error);
      alert('Error adding rare medicine');
    }
  };

  return (
    <div className="panel max-w-md">
      <h2 className="form-title">
        Add New Rare Medicine
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="field-label">
            Medicine Name
          </label>
          <input
            name="name"
            value={medicine.name}
            onChange={handleChange}
            required
            className="field-input"
          />
        </div>

        {/* Preparation */}
        <div>
          <label className="field-label">
            Preparation/Form
          </label>
          <input
            name="preparation"
            value={medicine.preparation}
            onChange={handleChange}
            required
            className="field-input"
          />
        </div>

        {/* Custom Category Dropdown */}
        <div ref={dropdownRef} className="relative">
          <label className="field-label">
            Rare Medicine Category
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="field-input flex items-center justify-between text-left"
          >
            <span>
              {medicine.category ? medicine.category : 'Select rare medicine category'}
            </span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                dropdownOpen ? 'transform rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="dropdown-panel">
              {rareMedicineCategories.map(({ label, options }) => (
                <div key={label} className="mb-1">
                  <div className="dropdown-group">
                    {label}
                  </div>
                  {options.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleCategorySelect(option)}
                      className={`dropdown-option ${
                        medicine.category === option
                          ? 'dropdown-option-active'
                          : ''
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rarity Level */}
        <div>
          <label className="field-label">
            Rarity Level
          </label>
          <select
            name="rarityLevel"
            value={medicine.rarityLevel}
            onChange={handleChange}
            required
            className="field-input"
          >
            <option value="">Select rarity level</option>
            <option value="Very Rare">Very Rare (1 in 100,000)</option>
            <option value="Rare">Rare (1 in 10,000)</option>
            <option value="Uncommon">Uncommon (1 in 1,000)</option>
            <option value="Specialty">Specialty (Limited Availability)</option>
          </select>
        </div>

        {/* Price Per Unit */}
        <div>
          <label className="field-label">
            Price Per Unit (BDT)
          </label>
          <input
            type="number"
            name="pricePerUnit"
            value={medicine.pricePerUnit}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="field-input"
          />
        </div>

        {/* Units Available */}
        <div>
          <label className="field-label">
            Units Available
          </label>
          <input
            type="number"
            name="unitsAvailable"
            value={medicine.unitsAvailable}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="field-input"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="field-label">
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleChange}
            required
            className="field-input"
          />
        </div>

        {/* Special Handling */}
        <div>
          <label className="field-label">
            Special Handling Requirements
          </label>
          <select
            name="specialHandling"
            value={medicine.specialHandling}
            onChange={handleChange}
            required
            className="field-input"
          >
            <option value="">Select handling requirements</option>
            <option value="Refrigeration Required">Refrigeration Required (2-8°C)</option>
            <option value="Frozen Storage">Frozen Storage (-20°C)</option>
            <option value="Room Temperature">Room Temperature (15-25°C)</option>
            <option value="Light Sensitive">Light Sensitive</option>
            <option value="Controlled Substance">Controlled Substance</option>
            <option value="None">No Special Requirements</option>
          </select>
        </div>

        {/* Clinical Notes */}
        <div>
          <label className="field-label">
            Clinical Notes
          </label>
          <textarea
            name="clinicalNotes"
            value={medicine.clinicalNotes}
            onChange={handleChange}
            rows="3"
            className="field-input"
            placeholder="Important clinical information, contraindications, or special considerations..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full"
        >
          Add Rare Medicine
        </button>
      </form>

      <div className="mt-3">
        <Link
          to="/stock4"
          className="btn-secondary w-full"
        >
          View Rare Medicine Stock
        </Link>
      </div>
    </div>
  );
}

export default RareMed;
