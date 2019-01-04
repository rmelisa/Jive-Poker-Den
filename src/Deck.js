import React, { Component, Fragment } from 'react';
import './Deck.css';

class Deck extends Component {
    constructor() {
        super();
        this.state = {
            deck:[],
            newDeck:[]
        };
    }

    componentDidMount() {
        document.title = "Jive Poker Den";
        this.createDeck();
    }

    createDeck = () => {
        let deck = []
        const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; 
        suits.forEach(function (suit) {
            values.forEach(function (value){
                let card = {suit, value};
                deck = deck.concat(card)
            });
        });
        this.setState({deck:deck});
    }

    shuffle = () => {
        let deck = this.state.deck;
        let count = deck.length;
        let temp;
        let i;
        
        while (count) {
            count --;
            i = Math.floor(Math.random() * count );
            temp = deck[count];
            deck[count] = deck[i];
            deck[i] = temp;
        }
        this.setState({deck:deck});

  }

    dealOneCard = () => {
        if (this.state.deck.length === 0) {
            return;
        }
        let deck = this.state.deck;
        let newDeck = this.state.newDeck;
        let i = Math.floor(Math.random() * (deck.length) )
        let card = deck[i];
        deck.splice(i,1);
        newDeck = newDeck.concat(card);
        this.setState({deck:deck, newDeck: newDeck});
    }

    reset = () => {
        this.setState({deck:[], newDeck:[]})
        this.createDeck();
    }
    

    render() {
        const displayCards = function (card) {
            return (
                <div className="card">
                    <div>
                        <div>{card.value}</div>
                        {(card.suit === "♥︎" || card.suit === "♦︎")? 
                            <div className="redCard">{card.suit}</div>: 
                            <div className="blackCard">{card.suit}</div>
                        }
                    </div>
                    <div className="bottomCard">
                        <div>{card.value}</div>
                        {(card.suit === "♥︎" || card.suit === "♦︎")? 
                            <div className="redCard">{card.suit}</div>: 
                            <div className="blackCard">{card.suit}</div>
                        }
                    </div>
                </div>
            );
        }
        
        return (
            <Fragment>
                <h1 className="title">JIVE POKER DEN</h1>
               <span className="button">
                <button onClick={this.shuffle}>Shuffle</button>
                <button onClick={this.reset}>Reset</button>
               </span> 
                <div className="deck">
                    {this.state.deck.map(displayCards)}
                </div>
                <hr></hr>
                <span className="button"><button onClick={this.dealOneCard}>Draw One</button></span>
                <div className="deck">
                    {this.state.newDeck.map(displayCards)}
                </div>
            </Fragment>

        );
    }
}

export default Deck;