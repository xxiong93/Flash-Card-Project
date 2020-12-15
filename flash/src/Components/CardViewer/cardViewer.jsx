import React from 'react';


function CardViewer(props){
    return(
        <div className='row row-spacer'>
            <div className='col-md-4'>
                {/* <button onClick={() => this.goToPreviousBook()}>Previous Book</button> */}
            </div>
            <div className='col-md-4'>
                <h1>{this.state.cards}</h1>
                {/* <h4>{this.books[this.state.bookNumber].author}</h4> */}
            </div>
            <div className='col-md-4'>
                {/* <button onClick={() => this.goToNextBook()}>Next Book</button> */}
            </div>
        </div>
        )
}

export default CardViewer;