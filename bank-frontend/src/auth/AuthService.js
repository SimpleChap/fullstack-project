const AUTH_BASE_URL = '/api/v1/auth'
const SESSION_KEY = 'mBankSession'

export function getSession() {
  const savedSession = localStorage.getItem(SESSION_KEY)
  return savedSession ? JSON.parse(savedSession) : null
}

// Backend returns JSON on success but a plain-text message on 400/401/500.
async function readResponse(response) {
  const text = await response.text()
  let data = null
  try {
    if (text) {
      data = JSON.parse(text)
    }
  } catch {
    // Non-JSON error responses are handled via the raw text below.
  }

  if (!response.ok) {
    throw new Error(data?.message || text || 'Something went wrong. Please try again.')
  }

  return data
}

export async function login(username, password) {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  return saveSession(await readResponse(response))
}

export async function register({ name, username, email, password }) {
  const response = await fetch(`${AUTH_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, email, password }),
  })

  await readResponse(response)
  // Register does not return a token, so log in right after to obtain one.
  return login(username, password)
}

function saveSession(user) {
  const session = { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role, token: user.token }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event('auth-change'))
  return session
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  window.dispatchEvent(new Event('auth-change'))
}
