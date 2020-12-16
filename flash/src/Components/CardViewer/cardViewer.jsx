import React from 'react';


function CardViewer(props){
    return(
        <div className='row row-spacer'>
            <div className='col-md-4'>
                <button onClick={() => props.goToPreviousCard()}>Previous Book</button>
            </div>
            <div className='col-md-4'>
                <h1></h1>
                {/* <Card /> */}
                {/* <h4>{this.books[this.state.bookNumber].author}</h4> */}
            </div>
            <div className='col-md-4'>
                <button onClick={() => props.goToNextCard()}>Next Card</button>
            </div>
        </div>
        )
}

export default CardViewer;