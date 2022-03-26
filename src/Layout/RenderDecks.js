import { useEffect , useState } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function RenderDecks() {

    const [results, setResults] = useState([]);
    let history = useHistory();

    const deleteHandler = (deckId) => {
        if(window.confirm("Delete this deck?\n\nYou will not be abe to recover it.")) {
            deleteDeck(deckId).then(history.go(0));
        }
    }

    
    useEffect(() => {
        async function fetchDecks() {
            let data = await listDecks();
            setResults(data);
        }
        fetchDecks();
    }, []);

    console.log(results);
    if (results){ 
        return results.map((deck) => {
          
          return(
            <div key={deck.id} className="container">
                <div className="card row pr-2 pl-3 mb-3" style={{ width: '20rem'}}>
                    <div className="card-body col">
                        
                            <div className="row justify-content-between">
                                <h5 className="card-title">{deck.name}</h5>
                                <p className="text-secondary">{deck.cards.length} cards</p>
                            </div>
                            <div className="row">
                                <p className="card-text mb-2">{deck.description}</p>
                            </div>
                            <div className="row">
                                <Link to={`/decks/${deck.id}`} className="btn btn-secondary"><span role="img" aria-label="magnifying glass">🔍</span> View</Link>
                                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-2"><span role="img" aria-label="books">📚</span> Study</Link>
                                <Link to="/" className="btn btn-danger ml-2" onClick={() => deleteHandler(deck.id)}><span role="img" aria-label="delete">❌</span></Link>
                            </div>
                        
                    </div>
                </div>
            </div>
          );

        });
    }
    
    
    




    return (
        <div className="card" style={{ width: '20rem'}}>
          <div className="card-body">
            <h5 className="card-title">Deck Name</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to="/" className="btn btn-secondary"><span role="img" aria-label="magnifying glass">🔍</span> View</Link>
            <Link to="/" className="btn btn-primary ml-2"><span role="img" aria-label="books">📚</span> Study</Link>
            <Link to="/" className="btn btn-danger ml-2"><span role="img" aria-label="delete">❌</span></Link>
          </div>
        </div>
    );
}

export default RenderDecks;