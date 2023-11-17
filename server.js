const cors = require('cors');
const express = require('express');
const mongodb = require('./data/database');

const app = express();

port = process.env.port || 8080;

app.use(cors())
app.use(express.json())
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port, () => { console.log('database listening on ' + port)});
    }
})