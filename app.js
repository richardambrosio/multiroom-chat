//Importando configs do servidor
var app = require('./config/server');

//Parametrizar a porta de escuta
var server = app.listen(8080, function(){
    console.log('server on');
});

//adicionando o socket.io para ouvir as requisições, na mesma porta http
var io = require('socket.io').listen(server);

app.set('io', io);

//Criar a conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });
}); //escutando as tentativas de conexão do cliente