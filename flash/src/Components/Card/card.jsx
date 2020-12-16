import React from "react";
import "./card.css";

function Card(props){
    return(
        <div className="card">
            <div className="cover">
                <h1 className="word">{props.card.word}</h1>
                <h4 className="definition">{props.card.definition}</h4>
            </div>
        </div>
    );
}



export default Card;