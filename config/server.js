//Importar o módulo do Express
var express = require('express');

//Importar o módulo do Consign
var consign = require('consign');

//Importar o módulo do Body-Parser
var bodyParser = require('body-parser');

//Importar módulo do Express-Validator
var expressValidator = require('express-validator');

//Iniciar objeto do express
var app = express();

//Setar as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views'); //indica onde está as views do projeto

//Configurar o middleware express.static
app.use(express.static('./app/public')); //indica onde estarão os arquivos estáticos(css, images, etc)

//Configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Configurar o midlewarre express-validator
app.use(expressValidator());

//Fazendo o autoload das rotas, models e controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app.controllers')
    .into(app);

//Exportar o objeto app
module.exports = app;