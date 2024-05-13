# Backend

This is the backend api server, created with TypeScript, Node, Express, Sequelize, Postgre and Swagger

# Usage

In order to run the dev server

- start the postgres database from the local-db using docker
- ```npm i```
- ```npm run dev```

app is available at http://localhost:3000, swagger can be accessed at http://localhost:3000/api-docs

Dev server is using config development.json

# Test

Test is using config/test.json

- start the test using ```npm run test```

# Migrations


# Docker

Docker image can be build and deployed behind nginx, using postgres
