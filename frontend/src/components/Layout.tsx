import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Wizard', path: '/wizard' },
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">Omni-Channel</h1>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Sidebar (Desktop) / Drawer (Mobile) */}
      <nav
        className={`
          fixed inset-0 z-40 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
          lg:flex lg:flex-col w-64 bg-white shadow-md
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 hidden lg:block">
          <h1 className="text-2xl font-bold text-blue-600">Omni-Channel</h1>
        </div>
        
        {/* Mobile Close Button Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-25 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        <ul className="mt-6 relative bg-white h-full lg:h-auto z-50">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-10 mt-0">
        {children}
      </main>
    </div>
  )
}

export default Layout
