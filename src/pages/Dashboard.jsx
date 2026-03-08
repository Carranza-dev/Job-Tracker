import { useState } from 'react'
import { supabase } from '../supabase'
import { useJobs } from '../hooks/useJobs'
import JobCard from '../components/jobCard'
import JobForm from '../components/jobForm'

const STATUSES = ['All', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function Dashboard({ user }) {
  const { jobs, loading, addJob, updateJob, deleteJob } = useJobs()
  const [filter, setFilter]     = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function handleAdd(formData) {
    const result = await addJob(formData)
    if (result.success) setShowForm(false)
    return result
  }

  async function handleUpdate(formData) {
    const result = await updateJob(editing.id, formData)
    if (result.success) setEditing(null)
    return result
  }

  async function handleDelete(id) {
    if (!confirm('Delete this application?')) return
    await deleteJob(id)
  }

  const filtered = filter === 'All' ? jobs : jobs.filter(j => j.status === filter)

  const stats = {
    total:     jobs.length,
    applied:   jobs.filter(j => j.status === 'Applied').length,
    interview: jobs.filter(j => j.status === 'Interview').length,
    offer:     jobs.filter(j => j.status === 'Offer').length,
    rejected:  jobs.filter(j => j.status === 'Rejected').length,
  }

  return (
    <div className="dashboard">

      {/* NAVBAR */}
      <nav className="dash-nav">
        <div className="dash-logo">JobTracker</div>
        <div className="dash-user">
          <span>{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dash-content">

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card applied">
            <div className="stat-number">{stats.applied}</div>
            <div className="stat-label">Applied</div>
          </div>
          <div className="stat-card interview">
            <div className="stat-number">{stats.interview}</div>
            <div className="stat-label">Interviews</div>
          </div>
          <div className="stat-card offer">
            <div className="stat-number">{stats.offer}</div>
            <div className="stat-label">Offers</div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-number">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        {/* HEADER */}
        <div className="dash-header">
          <h1>My Applications</h1>
          <button className="btn-add" onClick={() => { setShowForm(!showForm); setEditing(null) }}>
            {showForm ? '✕ Cancel' : '+ Add Application'}
          </button>
        </div>

        {/* FORM — agregar */}
        {showForm && (
          <div className="form-container">
            <h2>New Application</h2>
            <JobForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* FORM — editar */}
        {editing && (
          <div className="form-container">
            <h2>Edit Application</h2>
            <JobForm
              onSubmit={handleUpdate}
              initial={editing}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}

        {/* FILTROS */}
        <div className="filters">
          {STATUSES.map(s => (
            <button
              key={s}
              className={filter === s ? 'active' : ''}
              onClick={() => setFilter(s)}
            >
              {s}
              <span className="filter-count">
                {s === 'All' ? jobs.length : jobs.filter(j => j.status === s).length}
              </span>
            </button>
          ))}
        </div>

        {/* JOBS */}
        {loading ? (
          <div className="loading">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📋</div>
            <p>{filter === 'All' ? 'No applications yet. Add your first one!' : `No ${filter} applications.`}</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filtered.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}