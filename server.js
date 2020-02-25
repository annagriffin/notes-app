
//Install express server
const express = require('express');
const path = require('path');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;


const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/notes-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/notes-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

server.use(middlewares);
server.use(router);

server.listen(port);