const express = require('express');
const debug = require('debug')('app');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/normalize')));

app.get('/', (req, res) => {
  // __dirname = location of the current executable
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(port, () => {
  debug(`listening on port ${(port)}`);
});