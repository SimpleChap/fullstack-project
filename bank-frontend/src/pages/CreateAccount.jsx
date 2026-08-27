import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../auth/AuthService'
import './Pages.css'

function CreateAccount() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field.')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await register(form)
      navigate('/customer-dashboard')
    } catch (registerError) {
      setError(registerError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-card">
        <p className="page-eyebrow">Start simply</p>
        <h1>Create your account.</h1>
        <p className="auth-intro">Your account is created and saved through the M bank API.</p>
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
          <button className="form-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </section>
  )
}

export default CreateAccount
