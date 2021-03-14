const joi = require('@hapi/joi').extend(require('@joi/date'));

const user = joi.object({
    first_name: joi.string().regex(/^[a-zA-ZÀ-ÿ\s]*$/).min(1).max(50).required()
        .messages({'string.pattern.base': 'Only alphabetic characters are accepted'}),
    last_name: joi.string().regex(/^[a-zA-ZÀ-ÿ\s]*$/).min(1).max(100).required()
        .messages({'string.pattern.base': 'Only alphabetic characters are accepted'}),
    email: joi.string().max(150)
        .email({ tlds: { allow: false } }).required(),
    birth_date: joi.date().format('YYYY-MM-DD').utc().required()
        .messages({'date.format': 'Only date format is accepted: YYYY-MM-DD'})
});

const userId = {
    params: {
        id: joi.number().required()
    }
};

module.exports = {
    user, userId
};

