import { useState } from 'react'

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected']

const emptyForm = {
  company: '', position: '', status: 'Applied',
  date_applied: '', link: '', notes: ''
}

export default function JobForm({ onSubmit, initial = emptyForm, onCancel }) {
  const [form, setForm]     = useState(initial)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const result = await onSubmit(form)
    if (!result.success) setErrors(result.errors)
    else setForm(emptyForm)
    setLoading(false)
  }

  return (
    <div className="job-form">
      <div className="form-row">
        <div className="form-group">
          <label>Company *</label>
          <input
            name="company" placeholder="Google"
            value={form.company} onChange={handleChange}
            className={errors.company ? 'input-error' : ''}
          />
          {errors.company && <span className="field-error">{errors.company}</span>}
        </div>
        <div className="form-group">
          <label>Position *</label>
          <input
            name="position" placeholder="Junior Frontend Developer"
            value={form.position} onChange={handleChange}
            className={errors.position ? 'input-error' : ''}
          />
          {errors.position && <span className="field-error">{errors.position}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Status *</label>
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Date Applied *</label>
          <input
            type="date" name="date_applied"
            value={form.date_applied} onChange={handleChange}
            className={errors.date_applied ? 'input-error' : ''}
          />
          {errors.date_applied && <span className="field-error">{errors.date_applied}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Job Link</label>
        <input
          name="link" placeholder="https://linkedin.com/jobs/..."
          value={form.link} onChange={handleChange}
          className={errors.link ? 'input-error' : ''}
        />
        {errors.link && <span className="field-error">{errors.link}</span>}
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes" placeholder="How was the interview? What did they ask?"
          value={form.notes} onChange={handleChange}
          rows={3}
        />
      </div>

      {errors.general && <div className="auth-error">{errors.general}</div>}

      <div className="form-actions">
        {onCancel && <button className="btn-cancel" onClick={onCancel}>Cancel</button>}
        <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Application'}
        </button>
      </div>
    </div>
  )
}