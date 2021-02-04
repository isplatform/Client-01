const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())


app.post('/teste', (req, res) => {

    const intentName = req.body.queryResult.outputContexts.parameters;
    
    if (intentName == 'kit.grande'){
        res.json({"fulfillmentText": "Primeiro Webhook"})
    }
    
    
})

app.listen(process.env.PORT || 3005,() =>{
    console.log("Servidor ON")
})