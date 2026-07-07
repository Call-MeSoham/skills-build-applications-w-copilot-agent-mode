import { useEffect, useState } from 'react'
import { fetchComponentList } from './api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComponentList('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">Loaded from <code>/api/workouts/</code>.</p>

      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-secondary">No workouts were returned.</div>
      )}

      <div className="row g-3">
        {workouts.map((workout, index) => (
          <div key={workout.id ?? workout._id ?? index} className="col-12">
            <div className="card p-3 h-100">
              <div className="fw-semibold mb-2">{workout.name || workout.title || `Workout ${index + 1}`}</div>
              <pre className="mb-0 small text-wrap">{JSON.stringify(workout, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
