import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getSession, logout } from '../auth/AuthService'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Services', path: '/services' },
]

function Header() {
  const [session, setSession] = useState(getSession)
  const navigate = useNavigate()

  useEffect(() => {
    const updateSession = () => setSession(getSession())
    window.addEventListener('auth-change', updateSession)
    window.addEventListener('storage', updateSession)

    return () => {
      window.removeEventListener('auth-change', updateSession)
      window.removeEventListener('storage', updateSession)
    }
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">M</span>
        <span>M bank</span>
      </NavLink>
      <nav aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to={item.path}
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        {session ? (
          <>
            <span className="session-label">{session.username} · {session.role}</span>
            <Link className="account-button" to={session.role === 'Admin' ? '/admin-dashboard' : '/customer-dashboard'}>
              Dashboard
            </Link>
            <button className="sign-in-button" type="button" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link className="sign-in-button" to="/signin">Sign in</Link>
            <Link className="account-button" to="/create-account">Create account</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
