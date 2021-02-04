const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())


app.post('/teste', (req, res) => {
    res.json({"fulfillmentText": "Primeiro Webhook"})
})

app.listen(process.env.PORT,() =>{
    console.log("Servidor ON")
})