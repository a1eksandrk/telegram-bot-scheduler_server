class UserError extends Error {
  constructor (message: string, public readonly code = 401) {
    super(message)
  }
}

export default UserError
