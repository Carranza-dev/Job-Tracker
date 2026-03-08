import { useState } from 'react'
import { supabase } from '../supabase'
import { validateAuthDTO } from '../dto/jobDto'

export default function Login({ onSwitch }) {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [general, setGeneral] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { isValid, errors: valErrors } = validateAuthDTO(form)
    if (!isValid) { setErrors(valErrors); return }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword(form)
    if (error) setGeneral(error.message)
    setLoading(false)
  }

  return (
  <div className="auth-page">
    <div className="auth-left">
      <div className="auth-left-content">
        <div className="auth-brand">JobTracker</div>
        <h2 className="auth-headline">Track every opportunity.<br/>Land your dream job.</h2>
        <p className="auth-tagline">Stay organized, follow up on time, and never lose track of an application again.</p>
        <div className="auth-stats">
            <div className="auth-stat"><span>Free</span>Forever</div>
            <div className="auth-stat"><span>2026</span>Built this year</div>
            <div className="auth-stat"><span>React</span>+ Supabase</div>
    </div>
    <div className="auth-credit">
  © 2025 Job Tracker. All rights reserved - <span>Carranza-dev.</span>
</div>
      </div>
    </div>

    <div className="auth-right">
      <div className="auth-card">
        <div className="auth-logo">JobTracker</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your account</p>

        {general && <div className="auth-error">{general}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email" name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password" name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>

        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={onSwitch}>Sign up</span>
        </p>
      </div>
    </div>
  </div>
)
}