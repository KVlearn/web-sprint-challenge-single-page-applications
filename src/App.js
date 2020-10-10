import React,{useState} from "react";
import {Link,Route,Switch} from "react-router-dom";
import Home from './components/Home';
import Pizza from './components/Pizza';
import Congrats from './components/Congrats';
import data from './data';

const App = () => {
  const [items,setItems]=useState(data)
  // temporary state used to display response from API.  
   const [post, setPost] = useState([]);
    console.log('post value in app js',post)
  

  return (
    <>
      <nav>
      <h1>Kavya Eats</h1>
      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/pizza" data-cy="order">Order</Link>
      </div> 
      </nav> 
     
      <Switch>
        <Route path="/pizza/congrats">
        <Congrats post={post}/>
        </Route>

        <Route path="/pizza">
          <Pizza setPost={setPost}/>
        </Route>

        <Route path="/">
        <Home items={items}/>
        </Route>
      </Switch>
    </>
  );
};
export default App;
