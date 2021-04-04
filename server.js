const express = require('express');
const path = require('path');
var proxy = require('express-http-proxy');
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://mongouser:UTny42JKevGHaZvjyy8bqfJorwJv7Gv@cluster0.0p7if.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(express.static(__dirname + '/dist/frases-app'));

//app.use('/api/frase', proxy('frasesxavi-back.herokuapp.com',));

//app.use('/proxy', proxy('http://localhost:8081'));
app.use('/proxy', proxy(gethost, {
    filter: (req, res) => {
        return req.headers.destino;
    }
}));

function gethost(req, res) {
    console.log(res)
    return `https://${req.headers.destino}.herokuapp.com`;

}


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/ng-blog/index.html'));
});

//UTny42JKevGHaZvjyy8bqfJorwJv7Gv
app.get('/repositorios', function(req, res) {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("mydatabase").collection("repositorios");
        // perform actions on the collection object
        collection.find({}).toArray((errfind, result) => {
            if (errfind) throw errfind;
            console.log(result);

            client.close();
            res.json({ repositorios: result })
        });
    });


})


app.listen(process.env.PORT || 8080);