const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())


app.post('/teste', (req, res) => {

    let intentName = req.body.queryResult.intent.displayName
    
    if (intentName == "kit.grande"){
        res.json({"fulfillmentText": "Primeiro Webhook"})
    }
    else if (intentName == "kit.famila"){
        res.json({"fulfillmentText": "Primeiro Webhook 2"})
    }
    
    
})

app.listen(process.env.PORT || 3005,() =>{
    console.log("Servidor ON")
})