import React, { useState, useEffect } from "react";
import { useParams, Switch, Route, Link, useLocation } from "react-router-dom";
import Study from "./Study";
import DeckMenu from "./DeckMenu";
import { readDeck } from "../utils/api";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";


function ViewDeck(){
    const [currentDeck, setCurrentDeck] = useState([]);
    const [currentCards, setCurrentCards] = useState([]);
    let location = useLocation();
    
    let { deckId } = useParams();


    useEffect(() => {
        async function setDeck() {
            let data = await readDeck(Number(deckId));
            console.log(data);
            setCurrentDeck(data);
            setCurrentCards(data.cards);
        }
        setDeck();
    }, [deckId]);
    
    let pathArray = location.pathname.split('/');
    let theRest = "";
    if (pathArray.length > 3){
        if (pathArray[3] === 'edit'){
            theRest = "/ Edit Deck";
        }
        if (pathArray[3] === 'study'){
            theRest = "/ Study Deck";
        }
        if (pathArray[3] === 'cards'){
            if (pathArray[4] === 'new'){
                theRest = "/ New Card";
            }
            if (pathArray[5] === 'edit'){
                theRest = "/ Edit Card";
            }
        }
    }

    console.log(pathArray);
    return(
        <div>
            <div className="row bg-light p-2">
                <Link to="/" className="text-primary mr-2" ><span role="img" aria-label="home">🏠</span> Home</Link>
                <Link to={`/decks/${currentDeck.id}`} className="text-primary mr-2" >/ {currentDeck.name}</Link>
                <p>{`${theRest}`}</p>
            </div>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <DeckMenu currentDeck={currentDeck} />
                </Route>
                <Route path="/decks/:deckId/edit">
                    <EditDeck currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} />
                </Route>
                <Route path="/decks/:deckId/study">
                    <Study currentDeck={currentDeck} currentCards={currentCards} />
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <AddCard currentDeck={currentDeck} />
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} />
                </Route>
            </Switch>
        </div>
    );

}

export default ViewDeck;