import React from 'react';
import './App.css';

import SavedCards from "./components/SavedCards/SavedCards";
import NavBar from "./components/NavBar/NavBar";

function App() {
  // const cards:CardInterface[] =useSelector<CardState,CardInterface[]>((state)=>state.cards)
  // const dispatch = useDispatch()
  // const addCard= (card:CardInterface)=>{
  //   dispatch({type:"ADD_CARD",payload:card})
  // }
  return (
    <div className="App">
      {/* {
        cards.map((value,index)=>{
          return(
            <div key={index}>
              <p>{value.cardNumber}</p>
              <p>{value.year}</p>
              <p>{value.month}</p>
              <p>{value.cvv}</p>
            </div>
            
          )
        })
      }
      <button onClick={()=>{addCard({cardNumber:"123456789",year:"21",month:"12",cvv:"987"})}}>clickhere</button> */}
      <NavBar/>
      <SavedCards/>
      
    </div>
  );
}

export default App;
