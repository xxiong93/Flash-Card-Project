import React from 'react';
import Card from '../Card/card';

function CardViewer(props){
    return(
        <div className='row row-spacer'>
            <div className='col-md-4'>
                <button onClick={() => props.goToPreviousCard()}>Previous Card</button>
            </div>
            <div className='col-md-4'>
                <h1>{props.card.word}</h1> 
                <h4>{props.card.definition}</h4>
                <Card card={props.card}/>
                {/* <h4>{props.books[this.state.bookNumber].author}</h4> */}
            </div>
            <div className='col-md-4'>
                <button onClick={() => props.goToNextCard()}>Next Card</button>
            </div>
        </div>
        )
}

export default CardViewer;