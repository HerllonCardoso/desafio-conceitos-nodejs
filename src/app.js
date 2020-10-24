const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  
  const {title, url, techs} = request.body;
  
  const repository = { id: uuid(), title: title, url: url, techs: techs}

  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const repositoryIndex = repositories.find(repository => repository.id === id);

  if(repositoryIndex < 0 ){
    return response.status(400).json({message: "Repository didn't exist"})
  }

  const repository = { id: uuid(), title: title, url: url, techs: techs}

  
  repositories[repositoryIndex] = repository;


  return response.json({message: 'Repository edited successfully'})


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.find(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({message: 'Repository doesnt exist'})
  }

  repositories.splice(repositoryIndex, 1)

    return response.json({message: 'Repository was deleted'})
  });
    

app.post("/repositories/:id/like", (request, response) => {
  
});

module.exports = app;
