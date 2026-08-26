import { useEffect, useState } from 'react'
import { getCustomers } from '../api/DataService'
import Customer from '../models/Customer'
import './Pages.css'

function Services() {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadCustomers() {
      try {
        const data = await getCustomers()

        if (isCurrent) {
          setCustomers(data.map((customerData) => Customer.from(customerData)))
          setError('')
        }
      } catch (requestError) {
        if (isCurrent) {
          setError(requestError.message || 'Unable to load customers right now.')
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadCustomers()

    return () => {
      isCurrent = false
    }
  }, [])

  function getInitials(name) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart[0])
      .join('')
      .toUpperCase()
  }

  return (
    <section className="page">
      <section className="customer-directory" aria-labelledby="customer-directory-title">
        <div className="directory-heading">
          <div>
            <p className="page-eyebrow">Customer overview</p>
            <h2 id="customer-directory-title">Customer Directory</h2>
            <p>View customers registered with our banking services.</p>
          </div>
          {!isLoading && !error && <span className="customer-count">{customers.length} customers</span>}
        </div>

        {isLoading && <p className="directory-message">Loading customers...</p>}
        {error && <p className="directory-message directory-error">{error}</p>}
        {!isLoading && !error && customers.length === 0 && (
          <p className="directory-message">No customers are registered yet.</p>
        )}
        {!isLoading && !error && customers.length > 0 && (
          <div className="table-scroll" role="region" aria-label="Customer directory" tabIndex="0">
            <table className="customer-table">
              <thead>
                <tr>
                  <th scope="col">Customer ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email Address</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td><span className="customer-id">{customer.id}</span></td>
                    <td>
                      <span className="customer-name">
                        <span className="customer-initials" aria-hidden="true">{getInitials(customer.name)}</span>
                        {customer.name}
                      </span>
                    </td>
                    <td>{customer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}

export default Services
