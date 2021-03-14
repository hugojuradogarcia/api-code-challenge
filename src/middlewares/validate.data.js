const Boom = require('@hapi/boom');
const { BadRequest } = require('./ApiError');

module.exports = (schema) => {
    return async (request, response, next) => {
        try {
            await schema.validateAsync(request.body);
            next();
        } catch (error) {
            next(new BadRequest(Boom.badRequest(error)));
        }
    }
}