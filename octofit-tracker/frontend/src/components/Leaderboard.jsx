// -8000.app.github.dev/api/leaderboard
import { useEffect, useState } from 'react'
import { fetchComponentList } from './api'

// -8000.app.github.dev/api/leaderboard
function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComponentList('leaderboard')
      .then(setScores)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">Loaded from <code>/api/leaderboard/</code>.</p>

      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && scores.length === 0 && (
        <div className="alert alert-secondary">No leaderboard entries were returned.</div>
      )}

      <div className="row g-3">
        {scores.map((entry, index) => (
          <div key={entry.id ?? entry._id ?? index} className="col-12">
            <div className="card p-3 h-100">
              <div className="fw-semibold mb-2">{entry.username || entry.name || `Entry ${index + 1}`}</div>
              {entry.score != null && <div className="mb-2">Score: {entry.score}</div>}
              <pre className="mb-0 small text-wrap">{JSON.stringify(entry, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
