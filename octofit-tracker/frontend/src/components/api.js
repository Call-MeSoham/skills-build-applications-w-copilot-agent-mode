export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

export const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getApiUrl(component) {
  return `${API_HOST}/api/${component}/`;
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
