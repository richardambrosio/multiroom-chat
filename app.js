//Importando configs do servidor
var app = require('./config/server');

//Parametrizar a porta de escuta
app.listen(80, function(){
    console.log('server on');
});