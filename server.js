'use strict';

const express= require('express');
const superagent =require('superagent');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/hello', newSearch);
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

function newSearch(request, response){
  response.render('pages/index.ejs');
}


