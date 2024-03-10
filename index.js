const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const PORT = process.env.PORT || 4000;
const { handler } = require("./controller")

const app = express();
app.use(express.json());

app.post('*',async (req,res) => {
    // console.log(req.body);
    res.send(await handler(req,"POST"));
});    

app.get('*',async (req,res) => {
    res.send(await handler(req,"GET"));
});

app.listen(PORT,function(err){
    if (err) {
        console.log(err);
    }
    console.log("server listening on port",PORT);
});