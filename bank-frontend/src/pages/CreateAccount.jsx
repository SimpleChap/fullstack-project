import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAsCustomer, registerAccount } from '../auth/AuthService'
import './Pages.css'

function CreateAccount() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field.')
      return
    }

    registerAccount(form)
    loginAsCustomer(form.username, form.password)
    navigate('/customer-dashboard')
  }

  return (
    <section className="page auth-page">
      <div className="auth-card">
        <p className="page-eyebrow">Start simply</p>
        <h1>Create your account.</h1>
        <p className="auth-intro">This demo registration is saved in your browser only.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} autoComplete="name" />
          <label htmlFor="new-username">Username</label>
          <input id="new-username" name="username" value={form.username} onChange={handleChange} autoComplete="username" />
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
          <label htmlFor="new-password">Password</label>
          <input id="new-password" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="form-button" type="submit">Create account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </section>
  )
}

export default CreateAccount
