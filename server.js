const express = require('express');
const fs = require('fs');
const dataPath = './src/data/db.json'
const data = require(dataPath);

let decks = data.decks;
let cards = data.cards; 


    


const app = express();

// Works! Express will handle requests to `/test`, and defer to
// the `static` middleware for requests for other URLs.

app.use('/api', express.static('./docs/api'));

app.route('/api/decks')
    .get((req, res) => {
        let newData = data;
        newData.decks.forEach((deck) => deck.cards = [...newData.cards.filter((card) => card.deckId == deck.id)] );
        if(req.query._embed == 'cards'){
            res.json(newData.decks);
        }
        else {
            res.json(decks);
        }    
    })
    .post((req, res) => {
        data.decks.push(req.body);
        fs.writeFile(dataPath, JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
            console.log('writing to ' + dataPath);
        });
    });


app.route('/api/decks/:deckId')
    .get((req, res) => {
        let newData = data;
        let foundDeck = newData.decks.find((deck) => deck.id == req.params.deckId);
        foundDeck.cards = [...newData.cards.filter((card) => card.deckId == foundDeck.id)];
        if (req.query._embed == 'cards') {
            res.json(foundDeck);
        } 
        else {
            res.json(newData.decks.find((deck) => deck.id == req.params.deckId));
        }
    })
    .put((req, res) => {
        let updatedDeck = req.body;
        data.decks.forEach((deck) => {
            if (deck.id == req.body.id) {
                deck = updatedDeck;
            }
        });
        fs.writeFile(dataPath, JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
            console.log('writing to ' + dataPath);
        });
    })
    .delete((req, res) => {
        let newData = data;
        let foundDecks = newData.decks.filter((deck) => deck.id != req.params.deckId);
        data.decks = foundDecks;
        fs.writeFile(dataPath, JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
            console.log('writing to ' + dataPath);
        });
    });


app.route('/api/decks/:deckId/cards')
    .get((req, res) => {
        let newData = data;
        let foundDeck = newData.decks.find((deck) => deck.id == req.params.deckId);
        foundDeck.cards = [...newData.cards.filter((card) => card.deckId == foundDeck.id)];
        res.json(foundDeck.cards);
    });

app.route('/api/cards')
    .get((req, res) => {
        let newData = data;
        let foundCards = newData.cards.filter((card) => card.deckId == req.query.deckId)
        if (req.query.deckId) {
            res.json(foundCards);
        } else {
            res.json(data.cards); 
        }
    })
    .post((req, res) => {
        data.cards.push(req.body);
        fs.writeFile(dataPath, JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
            console.log('writing to ' + dataPath);
        });
    });
app.route('/api/cards/:cardId')
    .put((req, res) => {
        data.cards.forEach((card) => {
            if (card.id == req.params.cardId) {
                card = req.body;
            }
        });
    })
    .delete((req, res) => {
        let newData = data;
        let foundCards = data.cards.filter((card) => card.id !== req.params.cardId);
        data.cards = foundCards;
        fs.writeFile(dataPath, JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
            console.log('writing to ' + dataPath);
        });
    });

app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));