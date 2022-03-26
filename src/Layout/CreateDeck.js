import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";


function CreateDeck(){
  let history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    let deck = { name: e.target.elements.name.value, description: e.target.elements.description.value }
    createDeck(deck)
      .then((result) => {
        console.log(result);
        history.push(`/decks/${result.id}`);
        history.go(0);
      });
  }
    return(
        <div className="container col-12">
          <h2 className="mb-2">Create Deck</h2>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="name" >Name</label>
              <input style={{ width: '100%' ,}} className="pl-2" type="text" name="name" placeholder="Deck Name" />
            </div>
            <div className="mt-3">
              <label htmlFor="description">Description</label>
              <textarea style={{width: '100%' ,}} type="text"  className="mb-3 pb-5 pl-2" name="description" placeholder="Brief description of the deck" />
              <Link className="btn btn-secondary mr-2" to="/" >Cancel</Link>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>

        </div>
        
    );
}

export default CreateDeck;