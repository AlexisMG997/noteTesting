/* P3A.- Simple web server, Express 
//Importing Node's built-in web server module
const http = require("http");

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
];


const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(notes))
})

const PORT = 30001;
app.listen(PORT);
console.log(`Server runing on port ${PORT}`);
*/

/* P3A.- Web and Express, Nodemon, REST, Fetching a single resource, Deleting Resouces
         Postman, The Visual Studio Code REST client, The WebStorm HTTP Client
//Importing Node's built-in web server module
const express = require('express');
const app = express();

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
];

// Creating / route
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
})

// GetAll
app.get('/api/notes', (request, response) => {
    response.json(notes);
})

// GetBy
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(id);
    const note = notes.find(note => note.id === id);
    // Handle undefined results on find method
    if (note)
        response.json(note);
    else
        response.status(404).end();
})

// Delete
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

*/

//Importing Node's built-in web server module
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
];

const generateId = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => n.id))
    : 0;
    return maxId + 1;
}

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('---');
    next();
}
app.use(requestLogger);

// Creating / route
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
})

// GetAll
app.get('/api/notes', (request, response) => {
    response.json(notes);
})

// GetBy
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(id);
    const note = notes.find(note => note.id === id);
    // Handle undefined results on find method
    if (note)
        response.json(note);
    else
        response.status(404).end();
})

// DELETE
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
})

// POST
app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content){
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note);

    response.json(note);
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint"})
}
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
