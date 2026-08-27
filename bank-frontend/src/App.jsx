import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getSession } from './auth/AuthService'
import Layout from './layout/Layout'
import AdminDashboard from './pages/AdminDashboard'
import CreateAccount from './pages/CreateAccount'
import CustomerDashboard from './pages/CustomerDashboard'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'

function ProtectedRoute({ role, children }) {
  const session = getSession()

  if (!session) {
    return <Navigate to="/signin" replace />
  }

  if (role && session.role !== role) {
    return <Navigate to={session.role === 'ADMIN' ? '/admin-dashboard' : '/customer-dashboard'} replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/customer-dashboard" element={<ProtectedRoute role="CUSTOMER"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
