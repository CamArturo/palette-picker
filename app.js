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

app.locals.title = 'Palette Picker';
app.locals.projects = [

];

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;

  response.json({ projects });
});

app.post('/api/v1/create-project', (request, response) => {
  const {projectName} = request.body;

  app.locals.projects.push(projectName);

  response.status(201).json({colorPalette: projectName});
});

app.get('/', (req, res) => {
  // __dirname = location of the current executable
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(port, () => {
  debug(`listening on port ${(port)}`);
});