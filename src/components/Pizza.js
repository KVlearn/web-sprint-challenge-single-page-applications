import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

function Pizza({setPost}){
    let history=useHistory();
    console.log('history=',history)
    const [formState,setFormState]=useState({
        name:"",
        email:"",
        size:"",
        sauce:"Original Red",
        olive:false,
        onion:false,
        chicken:false,
        pepper:false,
        mushroom:false,
        subs:false,
        special:"",
        count:1
    })

    // server error
    const [serverError, setServerError] = useState("");

    // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error
    const [errors, setErrors] = useState({
        name:"",
        email:"",
        size:"",
        sauce:"",
        olive:"",
        onion:"",
        chicken:"",
        pepper:"",
        mushroom:"",
        subs:"",
        special:"",
        count:""
    });

  // temporary state used to display response from API.  
  // const [post, setPost] = useState([]);

  //inline validation of one key-value pair at a time with yup
  const validateChange =(e)=>{
    //  get the rules out of schema with reach at key "e.target.name" -->    "formSchema[e.target.name]"
    console.log('reaching this:',e.target.name);
     yup.reach(formSchema, e.target.name)
     .validate(
       e.target.type === "checkbox" ? e.target.checked : e.target.value
     )
     .then((valid) => {
       // the input is passing!
       // the reset of that input's error
       console.log("valid here", e.target.name);
       setErrors({ ...errors, [e.target.name]: "" });
     })
     .catch((err) => {
       // the input is breaking form schema
       // if failing validation, set error message into error state (this is used in JSX to display error)
       console.log("err here", err);
    
       setErrors({ ...errors, [e.target.name]: err.errors[0] });
     });
  }
  // whenever state updates, validate the entire form.
  // if valid, then change button to be enabled.
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("is my form valid?", valid);

      // valid is a boolean 
      setButtonIsDisabled(!valid);
    });
  }, [formState]);


  // Add a schema, used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    name: yup.string()
    .min(2,"Please enter name of atleast 2 characters")
    .required("oh please ! Name is required"),

    email: yup.string().email("Please enter a valid email"),  
    
    size: yup.string()
    .oneOf(["Family Size","Large","Medium","Small"])
    .required("Please choose size"),
    
    sauce: yup.string()
      .oneOf(["Original Red", "Garlic Ranch", "BBQ Sauce", "Spinach Alfredo"]),
    //toppings validation    
    olive: yup.boolean(),
    onion: yup.boolean(),
    chicken:yup.boolean(),
    pepper:yup.boolean(),
    mushroom:yup.boolean(),
    //slidebar validation
    subs: yup.boolean(),
    //special instruction validation
    special: yup.string(),
    //count validation
    count:yup.number(),
    
  });

    const handleChange=(e)=>{
        console.log('e in handleChange=',e)
        e.persist();
        const newFormState = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
          };
          console.log('After validate formState=',formState);
         
          validateChange(e); // for each change in input, do inline validation
          console.log('After validate err State=', errors)

          setFormState(newFormState); // update state with new data
    }

    const handleSubmit=(e)=>{
      console.log('e in handleSubmit:',e)
      e.preventDefault();
      callPost();
      
    }
    
    function callPost(){
        axios
        .post("https://reqres.in/api/users", formState)
        .then((res)=>{
            //update the stored post - with response from api
            console.log('Response back from reqres:',res.data)
            setPost(res.data)
            //clear error if successful request
            // console.log('post value=',post)
            setServerError(null);
            //clear and set initial form state
               
        })
        .catch((err)=>{
            setServerError("oops! Looks like server side error!");
        })
    }

    
    const confirmOrder=(e)=>{
      // console.log('post in confirm=',post)
      history.push('/pizza/congrats');
      setFormState({
        name:"",
        email:"",
        size:"",
        sauce:"Original Red",
        olive:false,
        onion:false,
        chicken:false,
        pepper:false,
        mushroom:false,
        subs:false,
        special:"",
        count:1
    });
    
      

    }

    return(
        <>
        <div className="pizza">
        <h2>Your favorite food...<br></br>delivered while you Code!</h2> 
        </div>
         <p className="build">Build Your Own Pizza !</p> 

         <form onSubmit={handleSubmit}>

         {serverError && <p className="error">{serverError}</p>}

         <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          data-cy="name"
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={handleChange}
          data-cy="email"
        />
        {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      </label>
        
          <label htmlFor="size"> <h5>Choice of Size </h5>
           <select
           id="size"
           name="size"
           value={formState.size}
           onChange={handleChange}
           data-cy="size">
           <option value="">***Please Choose One!***</option>
           <option value="Family Size">Family Size</option>
           <option value="Large">Large</option>
           <option value="Medium">Medium</option>
           <option value="Small">Small</option> 
           </select>   
          </label>
          <div className="sauce">
          <h5> Choice of Sauce</h5> 
          <label htmlFor="sauce">
             Original Red
            <input 
            type="radio"
            id="sauce"
            name="sauce"
            value= "Original Red" 
            checked={formState.sauce === "Original Red"}
            onChange={handleChange}/>
          </label>
          <label htmlFor="sauce">
             Garlic Ranch
            <input 
            type="radio"
            id="sauce"
            name="sauce"
             value="Garlic Ranch"
            checked={formState.sauce === "Garlic Ranch"}
            onChange={handleChange}/>
          </label>
          <label htmlFor="sauce">
             BBQ Sauce
            <input 
            type="radio"
            id="sauce"
            name="sauce"
            value="BBQ Sauce"
            checked={formState.sauce === "BBQ Sauce"}
            onChange={handleChange}/>
          </label>
          <label htmlFor="sauce">
             Spinach Alfredo
            <input 
            type="radio"
            id="sauce"
            name="sauce"
            value="Spinach Alfredo"
            checked={formState.sauce === "Spinach Alfredo"}
            onChange={handleChange}/>
          </label>
          </div>
        <div className="toppings">
            <h5>Add Toppings !</h5>
            <p>Choose upto 3</p><br/>
            <div>
              <label htmlFor="olive" className="top">
                Olives
                <input
                type="checkbox"
                id="olive"
                name="olive"
                checked={formState.olive}
                onChange={handleChange}/>
            </label>
            <label htmlFor="onion" className="top">
                Onions
                <input
                type="checkbox"
                id="onion"
                name="onion"
                checked={formState.onion}
                onChange={handleChange}/>
            </label>
            <label htmlFor="chicken" className="top">
                Chicken
                <input
                type="checkbox"
                id="chicken"
                name="chicken"
                checked={formState.chicken}
                onChange={handleChange}/>
            </label>
            <label htmlFor="pepper" className="top">
                Pepper
                <input
                type="checkbox"
                id="pepper"
                name="pepper"
                checked={formState.pepper}
                onChange={handleChange}/>
            </label>
            <label htmlFor="mushroom" className="top">
                Mushrooms
                <input
                type="checkbox"
                id="mushroom"
                name="mushroom"
                checked={formState.mushroom}
                onChange={handleChange}/>
            </label>
            </div>      
        </div>    

            <div className="substitute">
                <div>
                <h5>Gluten free crust (+$1)</h5>
                </div>
                <div>
                <label className="switch"> 
                <input type="checkbox"
                id="subs"
                name="subs"
                checked={formState.subs}
                onChange={handleChange}/>
                <span className="slider"></span>
                </label>
                </div>
             </div>

             <div className="special">
            <h5>Special Instructions</h5>
            <div>
              <label htmlFor="special">
                <textarea
                id="special"
                name="special"
                value={formState.special}
                onChange={handleChange}
                placeholder="Anything else you would like to add ?"
                 />
            </label>
            </div>
             </div>

             <div >
             <label htmlFor="count">
                <input className="count"
                id="count"
                type="number"
                name="count"
                value={formState.count}
                onChange={handleChange}
                />
            </label>
             </div>
             <div className="submit">
                 <button type="submit" disabled={buttonIsDisabled}
                 data-cy="add"> 
                 Add to Order
                </button>
             </div>
        </form>   
            <button disabled={buttonIsDisabled}
            className="confirm"
            data-cy="confirm"
            onClick={confirmOrder}
            >Confirm Order</button>
            <footer>Enjoy!</footer>
        </>
    )
}

export default Pizza;