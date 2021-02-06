const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// const dialogflow = require('@google-cloud/dialogflow')
// const uuid = require('uuid')
let buscaCep = require('busca-cep');
let mysql = require('mysql')
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// const projectId = 'jmcriatividades-gapm';
// const sessionId = uuid.v4();
// const sessionClient = new dialogflow.SessionsClient();
// const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId)
// console.log(sessionPath)


app.post('/teste', (req, res) => {


    let intentName = req.body.queryResult.intent.displayName

  
    if (intentName == "kit.grande") {

        let cep = req.body.queryResult.parameters['cep']
        buscaCep(cep, { sync: false, timeout: 1000 })
            .then(endereco => {
                let massas = req.body.queryResult.parameters['massas']
                let recheio = req.body.queryResult.parameters['recheio']
                let nomeItem = req.body.queryResult.parameters['nomeItem']
                let nomeCliente = req.body.queryResult.parameters['nomeCliente']
                let itemEndereco = endereco.logradouro + "-" + endereco.bairro + "," + endereco.localidade + "-" + endereco.uf + "--" + endereco.cep
                let quantidade = req.body.queryResult.parameters['quantidade']
                let data = req.body.queryResult.parameters['data']

                let connection = mysql.createConnection({
                    host: process.env.MYSQL_HOST,
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASS,
                    database: process.env.MYSQL_DB
                })
                connection.connect();

                connection.query("insert into solicitations values ('" + massas + "','" + recheio + "','" + nomeItem + "','" + nomeCliente + "','" + itemEndereco + "','" + quantidade + "','" + data + "')",

                    function (error, results, fields) {
                        if (error) throw error;
                        connection.end()
                        res.json({ "fulfillmentText": "Primeiro Webhook" });
                    })
            })

    }
    else if (intentName == "kit.famila") {
        res.json({ "fulfillmentText": "Primeiro Webhook 2" });
    }
    res.json({ "fulfillmentText": "Primeiro Webhook teste" })
});

app.listen(process.env.PORT, () => {
    console.log("Servidor ON")
});

