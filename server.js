'use strict';

const express= require('express');
const superagent =require('superagent');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', newSearch);
app.post('/searches', createSearch)
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

function newSearch(req, res) {

  res.render('pages/index.ejs');
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
}

function Book(data) {
  const placeHoldImg = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = data.title ? data.title : 'No Title Found';
  this.authors = data.authors ? data.authors : 'This book has no authors';
  this.description = data.description;
  this.imgLink = data.imageLinks.thumbnail ? data.imageLinks.thumbnail : placeHoldImg;
}
