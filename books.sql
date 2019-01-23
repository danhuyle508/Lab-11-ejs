DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  description VARCHAR(255),
  image_url VARCHAR(255),
  isbn VARCHAR(255),
  bookshelf VARCHAR(255)
);

INSERT INTO books (
  author,
  title,
  isbn,
  image_url,
  description,
  bookshelf
) VALUES (
  'John Granger',
  'Looking for God in Harry Potter',
  '987654321',
  'http://books.google.com/books/content?id=2GZlm91NNEgC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  'Description goes here, might be very long. Description goes here, might be very long. Description goes here, might be very long. Description goes here, might be very long. Description goes here, might be very long.',
  'our first books'
);

INSERT INTO books (
  author,
  title,
  isbn,
  image_url,
  description,
  bookshelf
) VALUES (
  'Frank Herbert',
  'Dune',
  '9780441013593',
  'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.',
  'our first books'
);
