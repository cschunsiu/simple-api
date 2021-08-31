const express = require('express');
const bodyParser = require('body-parser')

const router = require('./src/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.use('/', router);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
