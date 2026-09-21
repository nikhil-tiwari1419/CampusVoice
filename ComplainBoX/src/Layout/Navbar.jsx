import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { PUBLIC_LINKS, USER_LINKS, ADMIN_LINKS } from '../Ui/Navlink.jsx'
import { useAuth } from '../context/auth.jsx'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Determine which links to show based on user role
  const getNavLinks = () => {
    if (!user) return PUBLIC_LINKS
    if (user.role === 'admin') return ADMIN_LINKS
    if (user.role === 'student' || user.role === 'user') return USER_LINKS
    return PUBLIC_LINKS
  }

  const navLinks = getNavLinks()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  // Handle scroll to section for public links
  const handleSectionClick = (section) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const NavLinkItem = ({ item, onClick }) => {
    if (item.section) {
      return (
        <button
          onClick={() => {
            handleSectionClick(item.section)
            onClick?.()
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 sm:text-2xl text-sm font-medium ${
            activeSection === item.section
              ? 'bg-gray-300 text-white shadow-lg shadow-blue-600/30'
              : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {item.icon && <item.icon className="sm:w-8 sm:h-8 w-4 h-4" />}
          <span>{item.label}</span>
        </button>
      )
    }

    return (
      <NavLink
        to={item.path}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-xl font-medium ${
            isActive
              ? 'bg-cyan-100 text-black shadow-lg shadow-gray-600/30'
              : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100'
          }`
        }
      >
        {item.icon && <item.icon className="w-4 h-4" />}
        <span>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center sm:h-30 h-16">
          {/* Logo Section */}
          <div className="shrink-0">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-black hover:text-blue-700 transition-colors"
            >
              <div className="w-28 h-28 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Campus Voice" className=" sm:w-full sm:h-full w-14 h-14 object-cover rounded-lg" />
              </div>
              <span className="hidden text-4xl sm:inline">Campus Voice</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <div key={item.label}>
                <NavLinkItem item={item} />
              </div>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 capitalize">{user.name || user.role}</p>
                  <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-5 py-3 rounded-lg  text-2xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((item) => (
              <div key={item.label}>
                <NavLinkItem
                  item={item}
                  onClick={() => setMobileMenuOpen(false)}
                />
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {user ? (
                <>
                  <div className="px-3 py-3 bg-gray-100 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {user.name || user.role}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors font-medium text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all font-medium"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar