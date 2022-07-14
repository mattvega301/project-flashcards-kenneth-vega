import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createCard } from "../utils/api";
 
function AddCard({ currentDeck }) {
  let history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    let card = { front: e.target.elements.front.value, back: e.target.elements.back.value }
    createCard(currentDeck.id, card);
    history.go(0);
  }
    return (
        <div className="container col-12 mt-4">
        <h2 className="mb-2">{currentDeck.name}: Add Card</h2>
        <form onSubmit={submitHandler}>
          <div>
              <label htmlFor="name" >Front</label>
              <textarea style={{ width: '100%' ,}} className="pl-2" type="text" name="front" placeholder="Front side of card"/>
          </div>
          <div className="mt-3">
            <label htmlFor="description">Back</label>
            <textarea style={{width: '100%' ,}} type="text"  className="mb-3 pl-2" name="back" placeholder="Back side of card"/>
            <Link className="btn btn-secondary mr-2" to={`/decks/${currentDeck.id}`}>Done</Link>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>

      </div>
    );
}

export default AddCard;