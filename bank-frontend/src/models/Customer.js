class Customer {
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }

  static from(data) {
    return new Customer(data.id ?? data._id, data.name, data.email)
  }
}

export default Customer
