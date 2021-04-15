const express = require('express');

const path = require('path');
var proxy = require('express-http-proxy');
var MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://mongouser:UTny42JKevGHaZvjyy8bqfJorwJv7Gv@cluster0.0p7if.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/dist/frases-app'));


//app.use('/api/frase', proxy('frasesxavi-back.herokuapp.com',));

//app.use('/proxy', proxy('http://localhost:8081'));
app.use('/proxy', proxy(gethost, {
    filter: (req, res) => {        
        //!req.headers.destino && res.status(500).send('no envio el header del herokus.');
        return req.headers.destino;
    }
}));

function gethost(req, res) {
    console.log(req.path,req.headers.dev,req.body,req.headers.destino);
    return (req.headers.dev) ?
        'http://localhost:8081' :
        `https://${req.headers.destino}.herokuapp.com`;

}


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/ng-blog/index.html'));
});

//UTny42JKevGHaZvjyy8bqfJorwJv7Gv
app.get('/api/repositories', function (req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("mydatabase").collection("repositorios");
        // perform actions on the collection object
        collection.find({}).toArray((errfind, result) => {
            if (errfind) throw errfind;
            client.close();
            res.json({ repositorios: result })
        });
    });
})

app.post('/api/repository', function (req, res) {
    console.log("adicionar", req.body);
    if (req.body && req.body.idheroku && req.body.author) {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            if (err) throw err;
            const collection = client.db("mydatabase").collection("repositorios");
            // perform actions on the collection object
            collection.insertOne({ author: req.body.author, idheroku: req.body.idheroku }, (errorInsert) => {
                if (errorInsert) {
                    console.error(errdelete);
                    res.status(500).end();
                } else {
                    res.status(201).end();
                }
                client.close();
            });
        });
    } else {
        res.status(500).json({ error: "no envio la ifnormacion completa" });
    }
})

app.delete('/api/repository/:idheroku', function (req, res) {
    console.log("borrar", req.params);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("mydatabase").collection("repositorios");
        // perform actions on the collection object
        collection.deleteOne({ idheroku: req.params.idheroku }, (errdelete) => {
            if (errdelete) {
                console.error(errdelete);
                res.status(500).end();
            } else {
                res.status(201).end();
            }
            client.close();
        });
    });

});


app.listen(process.env.PORT || 8080);