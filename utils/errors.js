class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message = "Validation failed") {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class InternalSeverError extends Error {
  constructor(message = "Internal server error") {
    super(message);
    this.name = "InternalSeverError";
    this.statusCode = 500;
  }
}

module.exports = { NotFoundError, ValidationError, InternalSeverError };
