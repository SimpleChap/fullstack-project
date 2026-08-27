import { useState } from 'react'
import { getSession } from '../auth/AuthService'
import './Pages.css'

const DEFAULT_ACCOUNTS = { checking: 2450.75, savings: 8320.4 }
const ACCOUNT_LABELS = { checking: 'Checking', savings: 'Savings' }

function CustomerDashboard() {
  const session = getSession()
  const storageKey = `mBankDemoAccounts-${session.username}`
  const transactionsKey = `mBankDemoTransactions-${session.username}`
  const [accounts, setAccounts] = useState(() => JSON.parse(localStorage.getItem(storageKey)) || DEFAULT_ACCOUNTS)
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem(transactionsKey)) || [])
  const [fromAccount, setFromAccount] = useState('checking')
  const [toAccount, setToAccount] = useState('savings')
  const [amount, setAmount] = useState('')
  const [transferError, setTransferError] = useState('')
  const [transferMessage, setTransferMessage] = useState('')

  function handleTransfer(event) {
    event.preventDefault()
    const transferAmount = Number(amount)
    if (!amount || transferAmount <= 0) {
      setTransferError('Enter an amount greater than zero.')
      return
    }
    if (fromAccount === toAccount) {
      setTransferError('Choose two different accounts.')
      return
    }
    if (transferAmount > accounts[fromAccount]) {
      setTransferError('There are not enough funds in that account.')
      return
    }

    const nextAccounts = {
      ...accounts,
      [fromAccount]: accounts[fromAccount] - transferAmount,
      [toAccount]: accounts[toAccount] + transferAmount,
    }
    setAccounts(nextAccounts)
    localStorage.setItem(storageKey, JSON.stringify(nextAccounts))

    const nextTransactions = [
      { label: `Transfer to ${ACCOUNT_LABELS[toAccount]}`, amount: -transferAmount },
      { label: `Transfer from ${ACCOUNT_LABELS[fromAccount]}`, amount: transferAmount },
      ...transactions,
    ]
    setTransactions(nextTransactions)
    localStorage.setItem(transactionsKey, JSON.stringify(nextTransactions))

    setAmount('')
    setTransferError('')
    setTransferMessage(`$${transferAmount.toFixed(2)} transferred successfully.`)
  }

  const totalBalance = accounts.checking + accounts.savings

  return (
    <section className="page dashboard-page">
      <p className="page-eyebrow">Customer dashboard</p>
      <h1>Welcome, {session.username}.</h1>
      <p className="page-lead">Your account overview and demo banking activity.</p>
      <div className="balance-summary"><span>Total balance</span><strong>${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></div>
      <div className="account-grid">
        <article className="account-card"><span>Checking</span><strong>${accounts.checking.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong><small>Available balance</small></article>
        <article className="account-card"><span>Savings</span><strong>${accounts.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong><small>Available balance</small></article>
      </div>
      <div className="dashboard-panel token-panel">
        <span>Session token (JWT)</span>
        <code className="session-token">{session.token || 'No token available. Please sign in again.'}</code>
      </div>
      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <h2>Recent transactions</h2>
          {transactions.length === 0 && <p className="directory-message">No transactions yet. Transfer money to see activity here.</p>}
          {transactions.map((transaction, index) => (
            <div className="transaction" key={`${transaction.label}-${index}`}>
              <span>{transaction.label}</span>
              <strong className={transaction.amount > 0 ? 'positive' : ''}>{transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}</strong>
            </div>
          ))}
        </section>
        <section className="dashboard-panel"><h2>Transfer Money</h2><form className="auth-form" onSubmit={handleTransfer}><label htmlFor="from-account">From Account</label><select id="from-account" value={fromAccount} onChange={(event) => setFromAccount(event.target.value)}><option value="checking">Checking</option><option value="savings">Savings</option></select><label htmlFor="to-account">To Account</label><select id="to-account" value={toAccount} onChange={(event) => setToAccount(event.target.value)}><option value="savings">Savings</option><option value="checking">Checking</option></select><label htmlFor="transfer-amount">Amount</label><input id="transfer-amount" type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" />{transferError && <p className="form-error" role="alert">{transferError}</p>}{transferMessage && <p className="form-success" role="status">{transferMessage}</p>}<button className="form-button" type="submit">Transfer money</button></form></section>
      </div>
    </section>
  )
}

export default CustomerDashboard
