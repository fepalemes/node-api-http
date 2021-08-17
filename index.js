
const http = require('http');
const {
    lerArquivoPersistencia,
    repostaRequisicao,
    trataJSON
} = require('./functions')

// Lendo arquivo de config na persistência
let configFile = lerArquivoPersistencia('./configFile.json');

// Pegando valores do arquivo de config
let porta = configFile.port;
let apiAtiva = configFile.on;

if (apiAtiva) {

    const app = http.createServer(function (req, res) {

        const { method } = req;

        // Metódo GET
        if (method === 'GET') {

            // Resposta da requisição - devolvendo mensagem padrão
            repostaRequisicao(res, 200, ({ code: "1", "status": "GET realizado" }));

            // Console
            console.info('[API-HTTP][GET]: GET realizado');

        // Método POST
        } else if (method === 'POST') {

            // Payload enviado na requisição
            let body = [];
            req.on('error', (err) => {
                console.info(err);
            }).on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {

                body = Buffer.concat(body).toString();

                // Declara conteudo do payload
                let requisicao = trataJSON(body);

                // Valida se foi passado um payload
                if (requisicao) {

                    // ----------> Coloque aqui sua função desejada para tratar/executar ao realizar o POST

                    // Resposta da requisição - devolvendo mensagem padrão
                    repostaRequisicao(res, 200, ({ code: "1", "status": "POST realizado" }));

                    // Console
                    console.info('[API-HTTP][POST]: POST realizado');

                } else {
                    repostaRequisicao(res, 400, ({ code: "0", "status": "Payload não enviado" }));
                    console.info('[API-HTTP][POST][AVISO]: Tentativa de POST sem passar um payload:');
                }
            })

        } else {
            // Resposta caso seja passado um metodo não listado/configurado
            repostaRequisicao(res, 405, ({ code: "0", "status": "Metodo não permitido" }));
        }

    }).listen(porta, function () {
        console.info("------------------------------------------------");
        console.info(`[API-HTTP][ON] Rodando na porta: ${porta}`);
        console.info("------------------------------------------------\n");
    });

} else {
    console.info(`[API-HTTP][POST][AVISO]: API com a configuracao desligada => ${apiAtiva}`)
}