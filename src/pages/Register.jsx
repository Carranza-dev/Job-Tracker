import { useState } from 'react'
import { supabase } from '../supabase'
import { validateAuthDTO } from '../dto/jobDto'

export default function Register({ onSwitch }) {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [general, setGeneral] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { isValid, errors: valErrors } = validateAuthDTO(form)
    if (!isValid) { setErrors(valErrors); return }

    setLoading(true)
    const { error } = await supabase.auth.signUp(form)
    if (error) setGeneral(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">JobTracker</div>
        <h1 className="auth-title">Check your email</h1>
        <p className="auth-sub">We sent you a confirmation link. Click it to activate your account.</p>
        <button className="auth-btn" onClick={onSwitch}>Back to Sign In</button>
      </div>
    </div>
  )

  return (
  <div className="auth-page">
    <div className="auth-left">
      <div className="auth-left-content">
        <div className="auth-brand">JobTracker</div>
        <h2 className="auth-headline">Your job search,<br/>finally organized.</h2>
        <p className="auth-tagline">Add applications, track status, take notes — all in one clean dashboard.</p>
        <div className="auth-stats">
  <div className="auth-stat"><span>Free</span>Forever</div>
  <div className="auth-stat"><span>2026</span>Built this year</div>
  <div className="auth-stat"><span>React</span>+ Supabase</div>
</div>
      </div>
    </div>

    <div className="auth-right">
      <div className="auth-card">
        <div className="auth-logo">JobTracker</div>
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Start tracking your applications today</p>

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
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={onSwitch}>Sign in</span>
        </p>
      </div>
    </div>
  </div>
)
}