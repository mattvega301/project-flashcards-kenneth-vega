import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({ currentDeck, setCurrentDeck }) {
  let history = useHistory();


  function submitHandler(e) {
    e.preventDefault();
    let deck = { id: currentDeck.id, name: e.target.elements.name.value, description: e.target.elements.description.value }
    console.log(deck);
    updateDeck(deck).then(history.push(`/decks/${currentDeck.id}`));
    }
    return (
      <div className="container col-12 mt-4">
        <h2 className="mb-2">Edit Deck</h2>
        <form onSubmit={submitHandler}>
          <div>
              <label htmlFor="name" >Name</label>
              <input style={{ width: '100%' ,}}  className="pl-2" type="text" name="name" value={currentDeck.name} onChange={(e) => setCurrentDeck({...currentDeck, name: e.target.value})} />
          </div>
          <div className="mt-3">
            <label htmlFor="description">Description</label>
            <textarea style={{width: '100%' ,}} type="text"  className="mb-3 pb-5 pl-2" name="description" value={currentDeck.description} onChange={(e) => setCurrentDeck({...currentDeck, description: e.target.value})} />
            <Link className="btn btn-secondary mr-2" to={`/decks/${currentDeck.id}`}>Cancel</Link>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>

      </div>
    );
}

export default EditDeck;