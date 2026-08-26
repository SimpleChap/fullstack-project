import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../auth/AuthService'
import './Pages.css'

function SignIn() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    try {
      const session = login(username, password)
      navigate(session.role === 'Admin' ? '/admin-dashboard' : '/customer-dashboard')
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-card">
        <p className="page-eyebrow">Welcome back</p>
        <h1>Sign in to M bank.</h1>
        <p className="auth-intro">Use your username and password to continue.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="form-button" type="submit">Sign in</button>
        </form>
        <p className="auth-switch">New to M bank? <Link to="/create-account">Create an account</Link></p>
      </div>
    </section>
  )
}

export default SignIn
