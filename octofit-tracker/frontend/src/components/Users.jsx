// -8000.app.github.dev/api/users
import { useEffect, useState } from 'react'
import { fetchComponentList } from './api'

// -8000.app.github.dev/api/users
function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComponentList('users')
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <h2>Users</h2>
      <p className="text-muted">Loaded from <code>/api/users/</code>.</p>

      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-secondary">No users were returned.</div>
      )}

      <div className="row g-3">
        {users.map((user, index) => (
          <div key={user.id ?? user._id ?? index} className="col-12">
            <div className="card p-3 h-100">
              <div className="fw-semibold mb-2">{user.username || user.name || `User ${index + 1}`}</div>
              <pre className="mb-0 small text-wrap">{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users
