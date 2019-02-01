const express = require('express');

const db = require('./data/dbConfig.js')
const server = express ();

server.use(express.json())

server.get('/api/games',(req, res)=>{
    db('games')
    .then(games =>{
        res.status(200).json(games)
    })
    .catch(err=>{
        res.status(500).json({error: 'cannot get games'})
    })
})

server.post ('/api/games', (req, res) => {
    const body = req.body
    if(!req.body.title || !req.body.genre || !req.body.releaseYear){
        res.status(422).json({error: 'missing body element'})
    }
    db ('games').insert(body)
        .then (games => {
            res.status (201).json (games);
        })
        .catch (err => {
            res.status (500).json ({error: 'cannot post game'});
        });
});

module.exports = server;