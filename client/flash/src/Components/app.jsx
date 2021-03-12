import React, {Component} from 'react';

import CardViewer from './CardViewer/cardViewer';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.collection = [];
        this.state = {
            cards: [],
            currentCard: 0,
            loading: true
        }


    }

    getReactCollection(){
        axios.get('http://localhost:5000/api/collections/5fd03e7677436a648832415f')
        .then(response => {
            console.log(this.collection);
            let newCollection = response.data;
            console.log(newCollection);
            return(newCollection);
        });
    }
    getCSharpCollection(){
        axios.get('http://localhost:5000/api/collections/5fd03e7877436a6488324166')
        .then(response => {
            console.log(this.collection);
            let newCollection = response.data;
            console.log(newCollection);
            return(newCollection);
        });
    }
    goToNextCard(){
        let tempCardNumber = this.state.currentCard;
            tempCardNumber++;
        if(tempCardNumber === this.state.cards.length){
            tempCardNumber = 0;
        }
        this.setState({
            currentCard: tempCardNumber
        });
    }

    goToPreviousCard(){
        let tempCardNumber = this.state.currentCard;
            tempCardNumber--;
        if(tempCardNumber < 0)
            tempCardNumber = this.cards.length - 1;
        this.setState({
            currentCard: tempCardNumber
        });
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/collections/').then(response => {
            // console.log(this.state.cards);
            let newCollection = response.data;
            this.setState({
                cards: newCollection,
                loading: false
            });
            console.log(newCollection);
            console.log(this.state.cards);
        });
    }

    render() {
        return(
            this.state.loading ? <div>Loading...</div> :
        <div>
            <h1>Flash Cards</h1>
        <CardViewer card={this.state.cards[this.state.currentCard]} nextCard={() => this.goToNextCard()} 
            previousCard={() => this.goToPreviousCard()}/>
        {/* <Card card={this.state.cards[this.state.currentCard]}/> */}
        </div>
               
            );
    }
}

export default App;
