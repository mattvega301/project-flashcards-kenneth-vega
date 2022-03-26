import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, deleteCard } from "../utils/api";

function DeckMenu({ currentDeck }){
    let history = useHistory();

    function deleteDeckHandler(){
        if(window.confirm("Delete this deck?\n\nYou will not be abe to recover it.")) {
            deleteDeck(currentDeck.id);
            history.push('/');
            history.go(0);
        }
    }
    
    if(currentDeck.cards){
        return(
            <div className="col mb-5 mt-4">
                <div className="col mb-4">
                    <h3>{currentDeck.name}</h3>
                    <p>{currentDeck.description}</p>
                    <div className="row">
                        <div className="col text-nowrap mr-4">
                            <Link to={`/decks/${currentDeck.id}/edit`} className="btn btn-secondary"><span role="img" aria-label="pencil">✏️</span> Edit</Link>
                            <Link to={`/decks/${currentDeck.id}/study`} className="btn btn-primary ml-2"><span role="img" aria-label="books">📚</span> Study</Link>
                            <Link to={`/decks/${currentDeck.id}/cards/new`} className="btn btn-primary ml-2"><span role="img" aria-label="plus">➕</span> Add Cards</Link>
                        </div>
                        <div className="col-sm-2 col align-content-end">
                            <button className="btn btn-danger ml-2" onClick={() => deleteDeckHandler()}><span role="img" aria-label="delete">❌</span></button>
                        </div>
                    </div>
                
                </div>
                <div className="col">
                    <h2>Cards</h2>
                    {currentDeck.cards.map((card) => {
                        function deleteCardHandler(){
                            if(window.confirm("Delete this card?\n\nYou will not be abe to recover it.")) {
                                deleteCard(card.id);
                                history.go(0);
                            }
                        }
                        return (
                            <div key={card.id} className="border container bg-light p-3">
                                <div className="row">
                                    <div className="col">
                                        <p>{card.front}</p>                            
                                    </div>
                                    <div className="col">
                                        <p>{card.back}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mr-5">
                                                                    
                                    </div>
                                    <div className="col-sm col-lg-3">
                                        <Link to={`/decks/${currentDeck.id}/cards/${card.id}/edit`} className="mr-3 ml-2 btn btn-secondary"><span role="img" aria-label="pencil">✏️</span> Edit</Link>
                                        <Link to={`/decks/${currentDeck.id}`} className="btn btn-danger ml-1" onClick={() => deleteCardHandler()}><span role="img" aria-label="delete">❌</span></Link>  
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>   
            </div>
        );
    }
    else {
        return (
            <p>Loading...</p>
        );
    }
}

export default DeckMenu;