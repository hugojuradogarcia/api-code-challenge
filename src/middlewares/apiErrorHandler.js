const { ApiError } = require('./ApiError');

const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        let statusCode = err.getCode();
        return res.status(statusCode).json({
            status: statusCode == 400 ? 'Bad Request' :
                statusCode == 404 ? 'Not Found'
                    : 'Internal Server Error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'Internal Server Error',
        message: err.message
    });
}

module.exports = apiErrorHandler;