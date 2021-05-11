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

    socket.on('msgParaServidor', function(data){

        //eventos de diálogo
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        ); //envia apenas para um cliente
        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );//envia para todos os outros clientes do socket

        //participantes
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            ); //envia apenas para um cliente
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );//envia para todos os outros clientes do socket
        }
    });
}); //escutando as tentativas de conexão do cliente