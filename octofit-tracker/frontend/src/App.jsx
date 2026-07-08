import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiWarning = !codespaceName

function App() {
  return (
    <div>
      <header className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <h1 className="h3 mb-2">Octofit Tracker</h1>
          <p className="mb-2 text-white-75">
            React frontend using <code>import.meta.env.VITE_CODESPACE_NAME</code> to build API URLs.
          </p>
          {apiWarning ? (
            <div className="alert alert-warning mb-3">
              <strong>Warning:</strong> <code>VITE_CODESPACE_NAME</code> is not defined.
              The app will use <code>http://localhost:8000</code> as a safe fallback.
              Define it in <code>.env.local</code> to connect to the hosted API endpoint.
            </div>
          ) : (
            <div className="alert alert-success mb-3">
              API host is set to <code>{apiHost}</code>
            </div>
          )}
          <nav className="nav nav-pills flex-column flex-sm-row gap-2">
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <section className="container py-4">
                <div className="alert alert-info">
                  Page not found. Use the navigation above to browse activities, leaderboard,
                  teams, users, or workouts.
                </div>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
