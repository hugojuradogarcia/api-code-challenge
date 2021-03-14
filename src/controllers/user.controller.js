const pool = require('../configure/connection');
const { BadRequest, NotFound } = require('../middlewares/ApiError');

const getUsers = async (request, response, next) => {
    await pool.query('SELECT id, first_name, last_name, email, birth_date FROM users ORDER BY id ASC',
        (error, results) => {
        if (error) {
            next(error);
        }
        response.status(200).json(results.rows);
    });
}

const getUserById = async (request, response, next) => {
    const id = parseInt(request.params.id);

    await pool.query('SELECT id, first_name, last_name, email, birth_date FROM users WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                next(error);
            }
            if (results.rowCount < 1) {
                next(new NotFound(`Not found user by id: ${id}`));
            }
            response.status(200).json(results.rows[0]);
        });
}

const createUser = async (request, response, next) => {
    const { first_name, last_name, email, birth_date } = request.body;

    await pool.query('INSERT INTO users (first_name, last_name, email, birth_date) ' +
        'VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, birth_date],
        (error, results) => {
            if (error) {
                next(error);
            }
            response.status(201).send(results.rows);
    });
}

const updateUser = async (request, response, next) => {
    const id = parseInt(request.params.id);
    const { first_name, last_name, email, birth_date } = request.body;

    await pool.query('UPDATE users ' +
        'SET first_name = $1, last_name = $2, email = $3, birth_date = $4 WHERE id = $5',
        [first_name, last_name, email, birth_date, id],
        (error, results) => {
            if (error) {
                next(error);
            }
            if (results.rowCount < 1) {
                next(new BadRequest(`User not found to update by id: ${id}`));
            }
            response.status(204).send(`Update user with ID: ${results.insertId}`);
    });
}

const deleteUser = async (request, response, next) => {
    const id = parseInt(request.params.id);

    await pool.query('DELETE FROM users ' +
        'WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                next(error);
            }
            response.status(204).send(`Delete user with ID: ${results.insertId}`);
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};