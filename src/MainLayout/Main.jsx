import React from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { FaPills } from 'react-icons/fa'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/inventory', label: 'Inventory' },
  { to: '/sells', label: 'Sells' },
  { to: '/medicine', label: 'Medicine' },
  { to: '/customer', label: 'Customer' },
  { to: '/transaction', label: 'Transaction' },
  { to: '/reminder', label: 'Reminder' },
]

function Main() {
  return (
    <div className="min-h-screen">
      <header className="app-header">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <FaPills />
            </span>
            <span>
              <span className="brand-name block">Smart Pharma</span>
              <span className="brand-tag block">Pharmacy Management</span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1 overflow-x-auto">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Main
