DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS bookshelves;

CREATE TABLE bookshelves (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    description VARCHAR(2550),
    image_url VARCHAR(255),
    isbn VARCHAR(255),
    bookshelf_id INTEGER REFERENCES bookshelves(id)
);
