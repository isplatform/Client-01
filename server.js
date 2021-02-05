const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let buscaCep = require('busca-cep');
let mysql = require('mysql')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.post('/teste', (req, res) => {

    let intentName = req.body.queryResult.intent.displayName

    if (intentName == "kit.grande") {

        let cep = req.body.queryResult.parameters['cep']
        buscaCep(cep, { sync: false, timeout: 1000 })
            .then(endereco => {
                let massas = req.body.queryResult.parameters['massas']
                let recheio = req.body.queryResult.parameters['recheio']
                let kitGrande = req.body.queryResult.parameters['kitGrande']
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

                connection.query("insert into edvaldodeveloper_cms.solicitations values ('"+massas+"','"+recheio+"','"+kitGrande+"','"+nomeCliente+"','"+itemEndereco+"','"+quantidade+"','"+data+"')",

                function(error, results, fields){
                    if(error) throw error;
                    connection.end()
                    res.json({ "fulfillmentText": "Primeiro Webhook" });
                })
                
                

            })



        

        
    }
    else if (intentName == "kit.famila") {
        res.json({ "fulfillmentText": "Primeiro Webhook 2" });
    }


});

app.listen(process.env.PORT || 3005, () => {
    console.log("Servidor ON")
});