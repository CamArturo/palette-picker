const express = require('express');
const debug = require('debug')('app');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/normalize')));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/api/v1/projects', (request, response) => {

  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({error});
    });

});

app.post('/api/v1/projects', (request, response) => {
  const name = request.body;

  database('projects').insert(name, 'id')
    .then(projectId => {
      response.status(201).json({id: projectId[0]})
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/palettes', (request, response) => {
  const paletteInfo = request.body;

  database('palettes').insert(paletteInfo, 'id')
    .then(projectId => {
      response.status(201).json({id: projectId[0]})
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/', (req, res) => {
  // __dirname = location of the current executable
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(port, () => {
  debug(`listening on port ${(port)}`);
});