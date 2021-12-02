import React from 'react';
import './App.css';
import { CardState } from './redux/cardNumberReducer';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const cards=useSelector<CardState,CardState["cardNumber"]>((state)=>state.cardNumber)
  const dispatch = useDispatch()
  const addCard= (card:string)=>{
    dispatch({type:"ADD_CARD",payload:card})
  }
  return (
    <div className="App">
      {
        cards.map((value,index)=>{
          return(
            <p key={index}>{value}</p>
          )
        })
      }
      <button onClick={()=>{addCard("123456789")}}>clickhere</button>
      
      
    </div>
  );
}

export default App;
