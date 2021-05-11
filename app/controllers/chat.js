module.exports.iniciaChat = function(application, request, response){
    
    //Recuperando os dados com bodyParser
    var dadosForm = request.body;
    
    //Usando e express validator para validar o campo apelido
    request.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    request.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);
    
    var erros = request.validationErrors();

    if(erros) {
        response.render("index", {validacao: erros});
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
    );
    
    response.render('chat', {dadosForm: dadosForm});
}