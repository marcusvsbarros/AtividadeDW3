const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de Usuários e Projetos',
        description: 'Documentação da API de Usuários e Projetos',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/userRoute.js', './src/routes/projectRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);