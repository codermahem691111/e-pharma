import React from 'react'
import { Link } from 'react-router-dom'
import { MdInventory } from 'react-icons/md'
import { FaShoppingCart, FaUser, FaArrowRight, FaPills } from 'react-icons/fa'
import { RiMedicineBottleFill } from 'react-icons/ri'
import { FaStore } from 'react-icons/fa';
import { FaReceipt } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <div className="home-hero">
        <span className="home-eyebrow">
          <FaPills /> Smart Pharma
        </span>
        <h1 className="home-heading">Pharmacy Management Dashboard</h1>
        <p className="home-sub">
          Manage inventory, sales, customers and stock alerts from one clean workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

        {/* Inventory Card */}
        <Link to="/inventory" className="home-card group">
          <div className="home-icon bg-teal-50 text-teal-600">
            <MdInventory />
          </div>
          <div>
            <h2 className="home-title">Inventory</h2>
            <p className="home-desc">Add new medicines</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Sells Card */}
        <Link to="/sells" className="home-card group">
          <div className="home-icon bg-amber-50 text-amber-600">
            <FaShoppingCart />
          </div>
          <div>
            <h2 className="home-title">Sells</h2>
            <p className="home-desc">Billing and invoices</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Customer Card */}
        <Link to="/customer" className="home-card group">
          <div className="home-icon bg-sky-50 text-sky-600">
            <FaUser />
          </div>
          <div>
            <h2 className="home-title">Customer</h2>
            <p className="home-desc">Customer records</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Medicine Card */}
        <Link to="/medicine" className="home-card group">
          <div className="home-icon bg-rose-50 text-rose-600">
            <RiMedicineBottleFill />
          </div>
          <div>
            <h2 className="home-title">Medicine</h2>
            <p className="home-desc">Stock and expiry</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* E-commerce Card */}
        {/* <Link to="/commerce" className="bg-purple-500 rounded-lg shadow-lg aspect-square flex flex-col items-center justify-center space-y-4">
          <div className="bg-purple-100 p-6 rounded-full">
            <FaStore className="text-purple-700 text-5xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">E-commerce</h2>
        </Link> */}

        {/* Elder Care Card */}
        <Link to="/eldercare" className="home-card group">
          <div className="home-icon bg-indigo-50 text-indigo-600">
            <FaUser />
          </div>
          <div>
            <h2 className="home-title">Elder Care</h2>
            <p className="home-desc">Senior care products</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Mom & Baby Care Card */}
        <Link to="/mombabycare" className="home-card group">
          <div className="home-icon bg-pink-50 text-pink-600">
            <FaUser />
          </div>
          <div>
            <h2 className="home-title">Mom & Baby Care</h2>
            <p className="home-desc">Mother and child products</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Rare Medicine Card */}
        <Link to="/raremed" className="home-card group">
          <div className="home-icon bg-red-50 text-red-600">
            <RiMedicineBottleFill />
          </div>
          <div>
            <h2 className="home-title">Rare Medicine</h2>
            <p className="home-desc">Specialty and rare stock</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Transaction Card */}
        <Link to="/transaction" className="home-card group">
          <div className="home-icon bg-emerald-50 text-emerald-600">
            <FaReceipt />
          </div>
          <div>
            <h2 className="home-title">Transaction</h2>
            <p className="home-desc">Sales history and revenue</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

        {/* Reminder Card */}
        <Link to="/reminder" className="home-card group">
          <div className="home-icon bg-orange-50 text-orange-600">
            <FaExclamationTriangle />
          </div>
          <div>
            <h2 className="home-title">Reminder</h2>
            <p className="home-desc">Stock and expiry alerts</p>
          </div>
          <FaArrowRight className="home-arrow" />
        </Link>

      </div>
    </div>
  )
}

export default Home
