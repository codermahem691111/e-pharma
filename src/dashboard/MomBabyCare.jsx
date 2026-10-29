import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const momBabyCareCategories = [
  {
    label: 'Prenatal Care',
    options: [
      'Prenatal Vitamins',
      'Folic Acid Supplements',
      'Iron Supplements',
      'Pregnancy Support',
    ],
  },
  {
    label: 'Baby Care',
    options: [
      'Baby Vitamins',
      'Baby Supplements',
      'Teething Relief',
      'Baby Skincare',
      'Baby Bath Products',
    ],
  },
  {
    label: 'Postpartum Care',
    options: [
      'Postpartum Vitamins',
      'Breastfeeding Support',
      'Recovery Supplements',
      'Postpartum Skincare',
    ],
  },
  {
    label: 'Infant Nutrition',
    options: [
      'Baby Formula',
      'Nutritional Supplements',
      'Probiotics for Babies',
      'Digestive Support',
    ],
  },
  {
    label: 'Maternal Health',
    options: [
      'Lactation Support',
      'Maternal Wellness',
      'Hormone Balance',
      'Energy Supplements',
    ],
  },
  {
    label: 'Safety & Hygiene',
    options: [
      'Baby Safety Products',
      'Hygiene Essentials',
      'Sterilization Products',
      'First Aid for Babies',
    ],
  },
];

function MomBabyCare() {
  const [medicine, setMedicine] = useState({
    name: '',
    preparation: '',
    category: '',
    pricePerUnit: '',
    unitsAvailable: '',
    expiryDate: '',
    targetAge: '',
    safetyNotes: '',
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
      // Add type field to identify this as mom and baby care product
      const momBabyCareProduct = { ...medicine, type: 'momBabyCare' };
      await axios.post('https://pharma-backend-b08r.onrender.com/api/medicines', momBabyCareProduct);
      alert('Mom & Baby Care Product added successfully!');
      setMedicine({
        name: '',
        preparation: '',
        category: '',
        pricePerUnit: '',
        unitsAvailable: '',
        expiryDate: '',
        targetAge: '',
        safetyNotes: '',
      });
    } catch (error) {
      console.error('Error adding mom & baby care product:', error);
      alert('Error adding mom & baby care product');
    }
  };

  return (
    <div className="panel max-w-md">
      <h2 className="form-title">
        Add New Mom & Baby Care Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="field-label">
            Product Name
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
            Mom & Baby Care Category
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="field-input flex items-center justify-between text-left"
          >
            <span>
              {medicine.category ? medicine.category : 'Select mom & baby care category'}
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
              {momBabyCareCategories.map(({ label, options }) => (
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

        {/* Target Age */}
        <div>
          <label className="field-label">
            Target Age Group
          </label>
          <select
            name="targetAge"
            value={medicine.targetAge}
            onChange={handleChange}
            required
            className="field-input"
          >
            <option value="">Select target age</option>
            <option value="Prenatal">Prenatal (Pregnant Women)</option>
            <option value="0-6 months">0-6 months (Newborns)</option>
            <option value="6-12 months">6-12 months (Infants)</option>
            <option value="1-3 years">1-3 years (Toddlers)</option>
            <option value="3-5 years">3-5 years (Preschoolers)</option>
            <option value="Postpartum">Postpartum (New Mothers)</option>
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

        {/* Safety Notes */}
        <div>
          <label className="field-label">
            Safety Notes
          </label>
          <textarea
            name="safetyNotes"
            value={medicine.safetyNotes}
            onChange={handleChange}
            rows="3"
            className="field-input"
            placeholder="Important safety information, warnings, or usage notes..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full"
        >
          Add Mom & Baby Care Product
        </button>
      </form>

      <div className="mt-3">
        <Link
          to="/stock3"
          className="btn-secondary w-full"
        >
          View Mom & Baby Care Stock
        </Link>
      </div>
    </div>
  );
}

export default MomBabyCare;
