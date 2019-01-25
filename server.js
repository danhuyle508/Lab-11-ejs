'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');

require('dotenv').config();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.log(err));

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

app.use(
  methodOverride(request => {
    if(request.body && typeof request.body === 'object' && '_method' in request.body) {
      let method = request.body._method;
      delete request.body._method;
      return method;
    }
  })
);

app.set('view engine', 'ejs');

app.get('/', showBooks);
app.get('/books/:id', getOneBook);
app.post('/books', saveBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);
app.get('/searches', newSearch);
app.post('/searches', createSearch);

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

// --- Helper Functions --- //

function handleError(err, res) {
  console.error(err);
  res.render('pages/error', {err});
}

function getBookshelves() {
  const SQL = 'SELECT DISTINCT * FROM bookshelves;';
  return client.query(SQL);
}

// --- Route Callbacks --- //

function showBooks(req, res) {
  const SQL = `SELECT * FROM books;`
  return client.query(SQL)
    .then((results) => {
      res.render('pages/index', {results});
    })
    .catch((err) => handleError(err, res));
}

function getOneBook(req, res) {
  return getBookshelves()
    .then((bookshelves) => {
      let SQL = 'SELECT books.* FROM books LEFT JOIN bookshelves ON books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      return client.query(SQL, [req.params.id])
        .then((result) => {
          return res.render('pages/detailed-view', {book: result.rows[0], bookshelves: bookshelves.rows});
        }).catch(err => handleError(err, res));
    })
}

function saveBook(req, res) {
  let bookshelvesSQL = 'SELECT id FROM bookshelves WHERE name = $1;';
  client.query(bookshelvesSQL, [req.body.bookshelf])
    .then((bsSelectResult) => {
      if (!bsSelectResult.rows[0]) {
        client.query(
          'INSERT INTO bookshelves (name) VALUES ($1) RETURNING id;',
          [req.body.bookshelf]
        ).then((bsInsertResult) => {
          let SQL = 'INSERT INTO books (title, author, description, image_url, isbn, bookshelf_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
          let {title, author, description, image_url, isbn} = req.body;
          let values = [title, author, description, image_url, isbn, bsInsertResult.rows[0].id];
          return client.query(SQL, values)
            .then((result) => {
              res.redirect(`/books/${result.rows[0].id}`);
            }).catch(err => handleError(err, res));
        }).catch(err => handleError(err, res));
      } else {
        let SQL = 'INSERT INTO books (title, author, description, image_url, isbn, bookshelf_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
        let {title, author, description, image_url, isbn} = req.body;
        let values = [title, author, description, image_url, isbn, bsSelectResult.rows[0].id];
        return client.query(SQL, values)
          .then((result) => {
            res.redirect(`/books/${result.rows[0].id}`);
          }).catch(err => handleError(err, res));
      }
    }).catch(err => handleError(err, res));
}

function updateBook(req, res){
  let SQL = `UPDATE books SET title=$1, author=$2, description=$3, image_url=$4, isbn=$5, bookshelf_id=$6 WHERE id=$7;`;
  let {title, author, description, image_url, isbn, bookshelf_id} = req.body;
  let values = [title, author, description, image_url, isbn, bookshelf_id, req.params.id];
  return client.query(SQL, values)
    .then(()=>{
      res.redirect(`/books/${req.params.id}`);
    })
    .catch(err => handleError(err,res));
}

function deleteBook(req, res) {
  let SQL = `DELETE FROM books WHERE id=$1;`;
  return client.query(SQL, [req.params.id])
    .then(() => {
      res.redirect('/');
    })
    .catch(err => handleError(err,res));
}

function newSearch(req, res) {
  res.render('pages/searches/new');
}

function createSearch(req, res) {
  return getBookshelves()
    .then((bookshelves) => {
      let url = `https://www.googleapis.com/books/v1/volumes?q=+in${req.body.search[1]}:${req.body.search[0]}`;
      return superagent.get(url)
        .then((response) => {
          return response.body.items.map((bookItem) => {
            return new Book(bookItem.volumeInfo);
          })
        })
        .then((mapResults) => {
          return res.render('pages/results', {mapResults: mapResults, bookshelves: bookshelves.rows});
        }).catch((err) => handleError(err, res));
    }).catch((err) => handleError(err, res));
}

function Book(data) {
  this.title = data.title ? data.title : 'No Title Found';
  this.author = data.authors ? data.authors.join(' and ') : 'This book has no authors';
  this.description = data.description ? data.description : 'N/A';
  if (this.description.length > 254) this.description = this.description.slice(0, 250) + '...';
  this.image_url = data.imageLinks ? data.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
  this.isbn = data.industryIdentifiers ? data.industryIdentifiers[0].identifier : 'Strangely, there is no ISBN for this book';
}
