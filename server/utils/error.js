class ClientError extends Error {
  constructor(error = {}) {
    super();
    const message = `${error.message || error.sourceMessage || 'Something went wrong'}`;

    this.name = 'ClientError';
    this.code = error.code;
    this.status = error.status || 400;
    this.message = message;
    this.sourceMessage = error.sourceMessage;
    this.stack = error.stack;
  }
}

class ServerError extends Error {
  constructor(error = {}) {
    super();
    const message = `${error.message || error.sourceMessage || 'Something went wrong'}`;

    this.name = error.name || 'ServerError';
    this.code = error.code;
    this.status = error.status || 500;
    this.message = message;
    this.sourceMessage = error.sourceMessage;
    this.stack = error.stack;
  }
}

class MongoError extends Error {
  constructor(error = {}) {
    super();
    const message = `${error.message || error.sourceMessage || 'Something went wrong'}`;

    this.name = 'DataBaseError';
    this.code = error.code;
    this.status = error.status || 500;
    this.message = message;
    this.stack = error.stack;
    this.sourceMessage = error.sourceMessage;
  }
}

exports.ClientError = ClientError;
exports.ServerError = ServerError;
exports.MongoError = MongoError;
