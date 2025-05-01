const MongoClient=require('mongodb').MongoClient;
const express=require('express')
const app=express()
const url='mongodb://localhost:27017';
const dbName='Users'
let db;

MongoClient.connect(url).then(client => {
    console.log('Connexion réussie à MongoDB');
    db = client.db(dbName);
    app.get('/etudiant', (req, res) => {
      db.collection('etudiant').find({}).toArray()
        .then(docs => {
          res.status(200).json(docs);
        })
    });

    app.get('/etudiant/:id', (req, res) => {
      let id=req.params.id
      db.collection('etudiant').find({"id":id}).toArray()
        .then(docs => {
          res.status(200).json(docs);
        })
    });
 
    app.listen(82, () => {
      console.log(`Serveur démarré sur le port 82`);
    });
  })