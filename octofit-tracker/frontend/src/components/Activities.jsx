import { useEffect, useState } from 'react'
import { fetchComponentList } from './api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComponentList('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">Loaded from <code>/api/activities/</code>.</p>

      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-secondary">No activities were returned.</div>
      )}

      <div className="row g-3">
        {activities.map((activity, index) => (
          <div key={activity.id ?? activity._id ?? index} className="col-12">
            <div className="card p-3 h-100">
              <div className="fw-semibold mb-2">{activity.name || activity.title || `Activity ${index + 1}`}</div>
              <pre className="mb-0 small text-wrap">{JSON.stringify(activity, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
