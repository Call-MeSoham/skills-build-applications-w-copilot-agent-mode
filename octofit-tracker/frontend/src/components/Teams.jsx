// -8000.app.github.dev/api/teams
import { useEffect, useState } from 'react'
import { fetchComponentList } from './api'

// -8000.app.github.dev/api/teams
function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComponentList('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">Loaded from <code>/api/teams/</code>.</p>

      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-secondary">No teams were returned.</div>
      )}

      <div className="row g-3">
        {teams.map((team, index) => (
          <div key={team.id ?? team._id ?? index} className="col-12">
            <div className="card p-3 h-100">
              <div className="fw-semibold mb-2">{team.name || `Team ${index + 1}`}</div>
              <pre className="mb-0 small text-wrap">{JSON.stringify(team, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
