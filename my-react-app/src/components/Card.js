import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import './Card.css';

function Card({title,description,img}){
    return(
        <div className="card-container">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <img src={img} className="card-img-bottom" alt="Interview"/>
            </div>
        </div>
        
    )
}
export default Card;