CREATE DATABASE cloudapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    birth_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL CURRENT_TIMESTAMP
);