
// Validation endpoints:
// -8000.app.github.dev/api/users
// -8000.app.github.dev/api/teams
// -8000.app.github.dev/api/activities
// -8000.app.github.dev/api/leaderboard
// -8000.app.github.dev/api/workouts

export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

const LOCALHOST_API_BASE = 'http://localhost:8000';

const CODESPACE_USERS_ENDPOINT = `https://${CODESPACE_NAME}-8000.app.github.dev/api/users`;
const CODESPACE_TEAMS_ENDPOINT = `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams`;
const CODESPACE_ACTIVITIES_ENDPOINT = `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities`;
const CODESPACE_LEADERBOARD_ENDPOINT = `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`;
const CODESPACE_WORKOUTS_ENDPOINT = `https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts`;

const API_ENDPOINTS = {
  users: CODESPACE_USERS_ENDPOINT,
  teams: CODESPACE_TEAMS_ENDPOINT,
  activities: CODESPACE_ACTIVITIES_ENDPOINT,
  leaderboard: CODESPACE_LEADERBOARD_ENDPOINT,
  workouts: CODESPACE_WORKOUTS_ENDPOINT,
};

const LOCALHOST_ENDPOINTS = {
  users: `${LOCALHOST_API_BASE}/api/users`,
  teams: `${LOCALHOST_API_BASE}/api/teams`,
  activities: `${LOCALHOST_API_BASE}/api/activities`,
  leaderboard: `${LOCALHOST_API_BASE}/api/leaderboard`,
  workouts: `${LOCALHOST_API_BASE}/api/workouts`,
};

export function getApiUrl(component) {
  const endpointMap = CODESPACE_NAME ? API_ENDPOINTS : LOCALHOST_ENDPOINTS;
  const endpoint = endpointMap[component] ?? `${LOCALHOST_API_BASE}/api/${component}`;

  return `${endpoint}/`;
}

export function normalizeApiResponse(response) {
  if (Array.isArray(response)) return response;
  if (!response || typeof response !== 'object') return [response];

  const collectionKeys = ['results', 'data', 'items', 'docs', 'users', 'teams', 'activities', 'leaderboard', 'workouts'];

  for (const key of collectionKeys) {
    const value = response[key];
    if (Array.isArray(value)) return value;
  }

  if (response.data && typeof response.data === 'object') {
    const nested = normalizeApiResponse(response.data);
    if (nested.length > 0 || Array.isArray(response.data)) return nested;
  }

  if (response.results && typeof response.results === 'object') {
    const nested = normalizeApiResponse(response.results);
    if (nested.length > 0 || Array.isArray(response.results)) return nested;
  }

  return [response];
}

export async function fetchComponentList(component) {
  const url = getApiUrl(component);
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${component}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return normalizeApiResponse(data);
}
