import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import ViewDeck from "./ViewDeck";
import CreateDeck from "./CreateDeck.js";
import { Switch, Route, Link } from "react-router-dom";
import RenderDecks from "./RenderDecks";


function Layout() {
  

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" className="btn btn-secondary mb-5"><h2><span role="img" aria-label="plus">➕</span> Create New Deck</h2></Link>
            <RenderDecks />
          </Route>
          <Route path="/decks/new">
            <div className="row bg-light p-2">
              <Link to="/" className="text-primary mr-2" ><span role="img" aria-label="home">🏠</span> Home</Link>
              <p>/ Create Deck</p>
            </div>
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
          <div className="row bg-light p-2">
              <Link to="/" className="text-primary mr-2" ><span role="img" aria-label="home">🏠</span> Home</Link>
          </div>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
