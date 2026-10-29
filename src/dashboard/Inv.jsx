import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const categories = [
  {
    label: 'Solid Dosage Forms',
    options: [
      'Tablets - Plain',
      'Tablets - Chewable',
      'Tablets - Dispersible',
      'Tablets - Sublingual',
      'Capsules - Hard Gelatin',
      'Capsules - Soft Gelatin',
      'Lozenges / Troches',
      'Powders / Granules',
      'Effervescent Tablets',
    ],
  },
  {
    label: 'Semi-Solid Dosage Forms',
    options: ['Creams', 'Ointments', 'Gels', 'Pastes'],
  },
  {
    label: 'Liquid Dosage Forms',
    options: [
      'Syrups',
      'Suspensions',
      'Emulsions',
      'Drops - Eye',
      'Drops - Ear',
      'Drops - Nasal',
      'Mouthwash / Gargles',
    ],
  },
  {
    label: 'Injectable & Parenteral',
    options: ['Vials', 'Ampoules', 'Pre-filled Syringes', 'IV Infusion Bags'],
  },
  {
    label: 'External / Topical Applications',
    options: [
      'Lotions',
      'Medicated Patches',
      'Sprays',
      'Shampoos - Medicated',
    ],
  },
  {
    label: 'Special Dosage Forms',
    options: [
      'Inhalers - MDI',
      'Inhalers - DPI',
      'Nebulizer Solutions',
      'Suppositories - Rectal',
      'Suppositories - Vaginal',
      'Pessaries',
    ],
  },
];

function Inv() {
  const [medicine, setMedicine] = useState({
    name: '',
    preparation: '',
    category: '',
    pricePerUnit: '',
    unitsAvailable: '',
    expiryDate: '',
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
      await axios.post('https://pharma-backend-b08r.onrender.com/api/medicines', medicine);
      alert('Medicine added successfully!');
      setMedicine({
        name: '',
        preparation: '',
        category: '',
        pricePerUnit: '',
        unitsAvailable: '',
        expiryDate: '',
      });
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('Error adding medicine');
    }
  };

  return (
    <div className="panel max-w-md">
      <h2 className="form-title">
        Add New Medicine
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
            Preparation
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
            Type
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="field-input flex items-center justify-between text-left"
          >
            <span>
              {medicine.category ? medicine.category : 'Select dosage form'}
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
              {categories.map(({ label, options }) => (
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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full"
        >
          Add Medicine
        </button>
      </form>

      <div className="mt-3">
        <Link
          to="/stock"
          className="btn-secondary w-full"
        >
          View Stock
        </Link>
      </div>
    </div>
  );
}

export default Inv;
