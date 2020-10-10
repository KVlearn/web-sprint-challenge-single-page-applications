import React from "react";
import {useHistory} from "react-router-dom";


function Home({items}){

const history = useHistory();

const routeToOrder=()=>{
 history.push("/pizza")
}

return(
    <div className="home">
        <p className="banner">...For the Hungry Coders</p>
        <div className="routeToOrder">
        <div>
        <button onClick={routeToOrder}>Pizza!?</button>
        </div>
        </div>
        <div className="wrapper">
           
        {items.map(item=>{
            return(
            <div className="info" key={item.name}>
            <img className="pics" 
            src="http://lorempixel.com/400/200/food/3"
                alt="pizza type"/>
            <p className="details">{item.name} | Price :${item.price}</p>
            <p className="details"> {item.description}</p>
            </div>  
            )
        })
        }
        <h5>Your Favorite Food, delivered while you Code !</h5>
        </div>
        </div>
    )
}
export default Home;