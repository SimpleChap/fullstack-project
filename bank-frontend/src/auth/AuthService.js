const SESSION_KEY = 'mBankSession'
const ACCOUNTS_KEY = 'mBankAccounts'

export function getSession() {
  const savedSession = localStorage.getItem(SESSION_KEY)
  return savedSession ? JSON.parse(savedSession) : null
}

export function login(username, password) {
  const trimmedUsername = username.trim()

  if (!trimmedUsername || !password) {
    throw new Error('Username and password are required.')
  }

  return saveSession(trimmedUsername, trimmedUsername.toLowerCase() === 'admin' ? 'Admin' : 'Customer')
}

export function loginAsCustomer(username, password) {
  const trimmedUsername = username.trim()

  if (!trimmedUsername || !password) {
    throw new Error('Username and password are required.')
  }

  return saveSession(trimmedUsername, 'Customer')
}

function saveSession(username, role) {
  const session = { username, role }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event('auth-change'))
  return session
}

export function registerAccount(account) {
  const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]')
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  window.dispatchEvent(new Event('auth-change'))
}
