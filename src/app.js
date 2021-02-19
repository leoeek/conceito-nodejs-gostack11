const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    // TODO
    const project = { ...request.body, id:  uuid(), likes: 0};

    repositories.push(project)

    return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
    // TODO

    const { id } = request.params;

    const projectIndex = repositories.findIndex(index => index.id === id);

    if(projectIndex < 0) 
        return response.status(400).json({ error: 'Projeto não encontrado.'})

    if(request.body.id) delete request.body.id;
    if(request.body.likes) delete request.body.likes;

    repositories[projectIndex] = { ...repositories[projectIndex], ...request.body };
  
    return response.json(repositories[projectIndex]);

});

app.delete("/repositories/:id", (request, response) => {
    // TODO
    const { id } = request.params;

    const projectIndex = repositories.findIndex(index => index.id === id);

    if(projectIndex < 0) 
        return response.status(400).json({ error: 'Projeto não encontrado.'});

        repositories[projectIndex] = 'underfined'; 

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO
    const { id } = request.params;

    const projectIndex = repositories.findIndex(index => index.id === id);

    if(projectIndex < 0) 
        return response.status(400).json({ error: 'Projeto não encontrado.'});

    repositories[projectIndex].likes = repositories[projectIndex].likes+1;

    return response.json(repositories[projectIndex]);
});

module.exports = app;
