import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { updateCard } from "../utils/api";

function EditCard({ currentDeck, setCurrentDeck }) {
    let { cardId } = useParams();
    let history = useHistory();
    let [currentCard, setCurrentCard] = useState([]);

    
    useEffect(() => {
        let data = currentDeck.cards ? currentDeck.cards.find((card) => card.id === Number(cardId)) : [];
        setCurrentCard(data);
    }, [cardId, currentDeck.cards]);
    
    if (currentDeck.cards){


        
    
    
    
    function submitHandler(e) {
        e.preventDefault();
        let card = { id: cardId, front: e.target.elements.front.value, back: e.target.elements.back.value, deckId: currentDeck.id }
        console.log(card);
        updateCard(card).then((result) => console.log(result)).then(history.push(`/decks/${currentDeck.id}`)).then(history.go(0));
    }

    return (
        <div className="container col-12 mt-4">
            <h2 className="mb-2">Edit Card</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name" >Front</label>
                    <textarea style={{ width: '100%' }} className="pl-2" type="text" name="front" value={currentCard.front} onChange={(e) => setCurrentCard({ ...currentCard, front: e.target.value})} />
                </div>
                <div className="mt-3">
                    <label htmlFor="description">Back</label>
                    <textarea style={{width: '100%' }} type="text"  className="mb-3 pl-2" name="back" value={currentCard.back} onChange={(e) => setCurrentCard({ ...currentCard, back: e.target.value})} />
                    <Link className="btn btn-secondary mr-2" to={`/decks/${currentDeck.id}`}>Cancel</Link>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
    }
    else {
        return (
            <p>Loading...</p>
        );
    }
}

export default EditCard;