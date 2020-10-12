import React from "react";

function Congrats({post}){
    console.log('im in congrats!',post)

       return(
        <div>
         <p className="congrats" data-cy="congrats">Congrats! Your Pizza is on the way.
         <br/>Happy Coding!</p>
         <h4 className="done">...For the Hungry Coders</h4>
         <h6>Here is your Order details</h6>
         <div className="orderDetails">
         <div>  
         <h4>Hey {post.name}!</h4>
         <p>Size :{post.size}</p>
         <p>Sauce of your Choice :{post.sauce}</p>
       <p>{post.special}</p>
       <h4>Toppings you Chose:</h4>
       {(post.olive)? <p>Olives</p> : null}
       {(post.onion)? <p>Onion</p> : null}
       {(post.pepper)? <p>Pepper</p> : null}
       {(post.mushroom)? <p>Mushrooms</p> : null}
       {(post.chicken)? <p>Chicken</p> : null}
       <h4>Count:{post.count}</h4> 
       {(post.crust)?<p>Gluten Free</p> : null}
       </div>
       </div>
       <footer className="complete">Enjoy!</footer>
    </div>
    )
}

export default Congrats;