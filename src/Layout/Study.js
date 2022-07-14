import React, { useState } from "react";
import { useHistory, Link} from "react-router-dom";


function Study({ currentDeck, currentCards }) {
    const [currentCardId, setCurrentCardId] = useState(1);
    const [isFront, setIsFront] = useState(true);
    let currentSide = () => {
        if (isFront){
            return currentCards[currentCardId - 1].front;
        }
        else {
            return currentCards[currentCardId - 1].back;
        }
        
    }

    

    let history = useHistory();

    function resetOrReturn(){
        if (currentCardId === currentCards.length){
            if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
                setCurrentCardId(1); 
            }
            else {
                history.push("/");
            }
            
        }
    }

    

    

    if (currentDeck && currentCards) {
        if (currentCards.length >= 3) {
            if (isFront === true){
                return (
                    <div className="container">
                        <div className="col">
                            <div className="row">
                                <h2>{`Study: ${currentDeck.name}`}</h2>
                            </div>
                            <div className="row border">
                                <div className="col">
                                    <h5>Card {currentCardId} of {currentCards.length}</h5>
                                    <p>{currentSide()}</p>
                                        <button className="btn btn-secondary mb-3 mr-2" type="button" onClick={() => setIsFront(!isFront)}>Flip</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className="container">
                        <div className="col">
                            <div className="row">
                                <h2>{`Study: ${currentDeck.name}`}</h2>
                            </div>
                            <div className="row border">
                                <div className="col">
                                    <h5>Card {currentCardId} of {currentCards.length}</h5>
                                    <p>{currentSide()}</p>
                
                                        <button className="btn btn-secondary mb-3 mr-2" type="button" onClick={() => setIsFront(!isFront)}>Flip</button>
                                        <button className="btn btn-primary mb-3" type="button" onClick={() => {
                                            setCurrentCardId((current) => current === currentCards.length ? current + 0 : current + 1);
                                            resetOrReturn();
                                        }}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
            return(
                <div className="container">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <h2>{`Study: ${currentDeck.name}`}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h4>Not enough cards.</h4>
                                <p>{`You need at least 3 cards to study. There are only ${currentCards.length} in this deck.`}</p>
                                <Link to={`/decks/${currentDeck.id}/cards/new`} className="btn btn-primary mb-5"><span role="img" aria-label="plus">➕</span> Add Cards</Link>
                            </div>
                        </div>
                    </div>
                </div> 
            );
        }
    }
    else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    

}

export default Study;