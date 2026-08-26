const CUSTOMERS_URL = '/api/v1/customers'

export async function getCustomers() {
  const response = await fetch(CUSTOMERS_URL)

  if (!response.ok) {
    throw new Error(`Unable to load customers (${response.status})`)
  }

  return response.json()
}
