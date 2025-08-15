class InternalSeverError extends Error {
  constructor(message = "Internal server error") {
    super(message);
    this.name = "InternalSeverError";
    this.statusCode = 500;
  }
}

module.exports = { InternalSeverError };