import React,{useEffect} from 'react'; // it is similar to dynamic if condition in js
import './App.css';                    //this is first step we need to do inorder to do styling for the present page
import Header from "./Header";       // importing the header component basically this page is divided into 2 comp. 1.header 2.home
import Home from "./Home";            // next is importing home component file
import { BrowserRouter as Router , Switch , Route }   
from "react-router-dom";                   //routing in javascript 
import Checkout from './Checkout';         //importing checkout component to see the details of basket when clicked on basket icon
import Login from './Login';               // importing the login component which is created and styled 
import { auth } from './firebase';         // importing auth variable which is created in firebase.js which is used to get the user details we use (authUser) to get the name of the person entered
import { useStateValue } from './StateProvider'; //this is awesome functionality provided by react in stateprovider we created a data layer and pulled the data into a variable useStateValue which is used explicitly throughout the program.  
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders';

const promise = loadStripe(
  "pk_test_51HPvXEHWpsGDAeTfPrOGdfLaBjTLueqbHLKMQ69nrRprvxmRj1E2bEoU5yX7WB6ulcas4eUhdUMsVKrxtI2fnKKi00BrmyK0qE"
);

function App() {
  const [{},dispatch]=useStateValue();  //this is an array 
  useEffect(() => {
    //will only run once when the app component loads...

    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>',authUser);

      if(authUser){
        // the user just logged in / the user was logged in
        dispatch({
          type : 'SET_USER',
          user : authUser
        })
      }else{
        //the user is logged out
        dispatch({
          type : 'SET_USER',
          user : null
        })
      }
    })
  }, [])
  return (
    //BEM convention
    <Router>
      <div className="app">
          <Header />
          <Switch>

           <Route path="/orders"> 
                  <Header />
                  <Orders />
              </Route>

             <Route path="/login"> 
                  <Login />
              </Route>
              <Route path="/payment"> 
                  
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
              </Route>
              <Route path="/checkout"> 
                  <Checkout />
              </Route> 
              <Route path="/">
                <Home />
              </Route>
          </Switch>
        </div>
    </Router> 
  );
}

export default App;
