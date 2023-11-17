const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Music Library API',
    description: 'An API for storing songs and creating a personal playlist.'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['../routes/index.js'];

swaggerAutogen(outputFile, routes, doc);