import { useEffect, useState } from 'react'
import { getCustomers } from '../api/DataService'
import Customer from '../models/Customer'
import './Pages.css'

function AdminDashboard() {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCustomers()
      .then((data) => setCustomers(data.map((customerData) => Customer.from(customerData))))
      .catch((requestError) => setError(requestError.message || 'Unable to load customers.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="page dashboard-page">
      <p className="page-eyebrow">Admin dashboard</p>
      <h1>Customer overview.</h1>
      <p className="page-lead">Manage a clear view of customers registered with M bank.</p>
      <section className="customer-directory" aria-labelledby="admin-directory-title">
        <div className="directory-heading"><div><p className="page-eyebrow">Real customer API data</p><h2 id="admin-directory-title">Customer Directory</h2><p>Account balances shown below are frontend demo information.</p></div>{!isLoading && !error && <span className="customer-count">{customers.length} customers</span>}</div>
        {isLoading && <p className="directory-message">Loading customers...</p>}
        {error && <p className="directory-message directory-error">{error}</p>}
        {!isLoading && !error && customers.length === 0 && <p className="directory-message">No customers are registered yet.</p>}
        {!isLoading && !error && customers.length > 0 && <div className="table-scroll" role="region" aria-label="Admin customer directory" tabIndex="0"><table className="customer-table"><thead><tr><th scope="col">Customer ID</th><th scope="col">Customer Name</th><th scope="col">Email Address</th><th scope="col">Demo accounts</th></tr></thead><tbody>{customers.map((customer) => <tr key={customer.id}><td><span className="customer-id">{customer.id}</span></td><td><span className="customer-name"><span className="customer-initials" aria-hidden="true">{customer.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span>{customer.name}</span></td><td>{customer.email}</td><td><span className="mock-account">Checking $2,450.75<br />Savings $8,320.40</span></td></tr>)}</tbody></table></div>}
      </section>
    </section>
  )
}

export default AdminDashboard
