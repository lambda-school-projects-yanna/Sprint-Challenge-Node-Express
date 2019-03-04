const express = require('express');
const projects = require('./routes/projects.js');
const actions = require('./routes/actions.js');
const cors = require('cors');

const server = express();

server.use(cors())

server.use(express.json());
server.use('/api/projects', projects);
server.use('/api/actions', actions);

server.use('/', cors(), (req, res) => {
    res.send('API active.')
}); 

server.listen(4000, () => {
    console.log('\n *** API running on port 4000 *** \n');
});

