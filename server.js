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
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

function newSearch(req, res) {
/*   let url = `https://www.googleapis.com/books/v1/volumes?q=+in${request.body.search[1]}:${request.body.search[0]}`;
  return superagent.get(url)
    .then((response) => {

    }) */
  res.render('pages/index.ejs');
}


