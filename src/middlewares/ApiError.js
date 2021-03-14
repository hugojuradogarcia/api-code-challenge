class ApiError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        } if (this instanceof NotFound) {
            return 404;
        }
        return 500;
    }
}

class BadRequest extends ApiError { }
class NotFound extends ApiError { }

module.exports = {
    ApiError,
    BadRequest,
    NotFound
};