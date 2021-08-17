const fs = require('fs');

// Função de tratamento para resposta da requisição
function repostaRequisicao(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    if (message) { 
        res.end(JSON.stringify(message)); 
    } else { 
        res.end(); 
    }
}

// Função de tratamento do JSON passado na requisição
function trataJSON(requisicao) {
    try {
        let cache = JSON.parse(requisicao);
        return cache;
    } catch (error) {
        console.info('[API-HTTP][TRATAR-JSON][ERRO]: Erro ao realizar o tratamento do JSON', error);
        return false;
    }
}

// Função de leitura de arquivo na persistência
function lerArquivoPersistencia(path) {
    try {
        let cache = JSON.parse(fs.readFileSync(path));
        return cache;
    } catch (error) {
        console.info('[API-HTTP][ARQUIVO-PERSISTENCIA][ERRO]: Erro ao ler arquivo na persistencia', path);
        return false;
    }
}

module.exports = {
    repostaRequisicao,
    trataJSON,
    lerArquivoPersistencia
}