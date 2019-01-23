'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

require('dotenv').config();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.log(err));

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', showBooks);
app.get('/searches', newSearch)
app.post('/searches', createSearch)
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

function newSearch(req, res) {
  res.render('pages/searches/new');
}

function handleError(err, res) {
  console.error(err);
  res.render('pages/error', {err});
}

function showBooks(req, res) {
  const SQL = `SELECT * FROM books;`
  return client.query(SQL)
    .then((results) => {
      console.log(results);
      res.render('pages/index', {results});
    })
    .catch((err) => handleError(err, res));
}

function createSearch(req, res) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=+in${req.body.search[1]}:${req.body.search[0]}`;
  return superagent.get(url)
    .then((response) => {
      return response.body.items.map((bookItem) => {
        return new Book(bookItem.volumeInfo);
      })
    })
    .then((mapResults) => {
      return res.render('pages/results', {mapResults});
    })
    .catch((err) => handleError(err, res));
}

function Book(data) {
  const placeHoldImg = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = data.title ? data.title : 'No Title Found';
  this.authors = data.authors ? data.authors.join(' and ') : 'This book has no authors';
  this.description = data.description;
  this.imgLink = data.imageLinks.thumbnail ? data.imageLinks.thumbnail : placeHoldImg;
}
