const STATUS_COLORS = {
  Applied:   { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa', border: 'rgba(59,130,246,0.3)'  },
  Interview: { bg: 'rgba(245,158,11,0.15)',  text: '#fbbf24', border: 'rgba(245,158,11,0.3)'  },
  Offer:     { bg: 'rgba(34,197,94,0.15)',   text: '#4ade80', border: 'rgba(34,197,94,0.3)'   },
  Rejected:  { bg: 'rgba(239,68,68,0.15)',   text: '#f87171', border: 'rgba(239,68,68,0.3)'   },
}

export default function JobCard({ job, onEdit, onDelete }) {
  const color = STATUS_COLORS[job.status] || STATUS_COLORS.Applied

  function formatDate(d) {
    return new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <div className="job-company">{job.company}</div>
          <div className="job-position">{job.position}</div>
        </div>
        <span className="job-status" style={{
          background: color.bg,
          color: color.text,
          border: `1px solid ${color.border}`
        }}>
          {job.status}
        </span>
      </div>

      <div className="job-card-meta">
        <span>📅 {formatDate(job.date_applied)}</span>
        {job.link && (
          <a href={job.link} target="_blank" rel="noreferrer" className="job-link">
            View Job →
          </a>
        )}
      </div>

      {job.notes && <p className="job-notes">{job.notes}</p>}

      <div className="job-card-actions">
        <button className="btn-edit" onClick={() => onEdit(job)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </div>
  )
}