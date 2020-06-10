class AuthError {
  constructor(message, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AuthError;