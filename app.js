//Importando configs do servidor
var app = require('./config/server');

//Parametrizar a porta de escuta
var server = app.listen(8080, function(){
    console.log('server on');
});

//adicionando o socket.io para ouvir as requisições, na mesma porta http
require('socket.io').listen(server);