import React, {Component} from 'react';
// import Card from '../Components/Card';
import CardViewer from './CardViewer/cardViewer';
import axios from 'axios';

class App extends Component {
    state = {
        collection: [],
        cards: []
    };

    getReactCollection(){
        axios.get('http://localhost:5000/api/collections/5fd03e7677436a648832415f').then(response => {
            console.log(this.state.collection);
            let collection = response.data;
            this.setState(collection);
            console.log(collection);
            return(collection);
        });
    }
    getCSharpCollection(){
        axios.get('http://localhost:5000/api/collections/5fd03e7677436a648832415f').then(response => {
            console.log(this.state.collection);
            let collection = response.data;
            this.setState(collection);
            console.log(collection);
            return(collection);
        });
    }
    getCards(){
        axios.get('http://localhost:5000/api/collections/5fd03e7677436a648832415f/cards').then(response => {
            console.log(this.state.cards);
            let cards = response.data;
            this.setState(cards);
            console.log(cards);
            return(cards);
        });
    }

    createReactCard(){
        // axios.post('http://localhost:5000/api/collections/5fd03e7677436a648832415f/cards').then(response => {
        //     console.log()
        // }


    }


    componentDidMount(){
        
    }

    render() {
        return(
        <div><h1>TEST PAGE</h1>
        <h2>{this.state.collection}</h2>
        <CardViewer />
        <button onClick={() => {
                    return this.getCards();
                }}>Show React Cards</button>
        </div>
            );
    }
}

export default App;
