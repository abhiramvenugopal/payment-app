import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardInterface, CardState } from '../../redux/cardNumberReducer';
import CardNumber from "../CardNumber/CardNumber";
import chipsvg from "../../assets/chip.svg";
import './SavedCards.css';



function SavedCards() {
  const cards:CardInterface[] =useSelector<CardState,CardInterface[]>((state)=>state.cards)

    const [display, setdisplay] = useState(false)
    const [inputValues, setinputValues] = useState({})
    const [cardNumber, setcardNumber] = useState("")
    const [cardsList, setcardsList] = useState(cards)


    
    const dispatch = useDispatch()
    const addCard= (card:CardInterface)=>{
      dispatch({type:"ADD_CARD",payload:card})
    }
    useEffect(() => {
      let temp:CardInterface[]=[...cards]
      setcardsList(temp)
      
    }, [cards])


    const limitLength=(value:string,id:string)=>{
      let temp={...inputValues}
      if(id==="month"){
        temp={...inputValues,month:value}
      }
      if(id==="year"){
        temp={...inputValues,year:value}
      }
      if(id==="cvv"){
        temp={...inputValues,cvv:value}
      }
      setinputValues(temp)
      console.log(temp)
    }
    
  return (
    <div>
      <button onClick={()=>{addCard({name:"abhiram venugopal",cardNumber:"123456789",year:"21",month:"12",cvv:"987"})}}>clickhere</button>
      <div className="container">
        
        
        <div className="saved-cards-container">
          {
          
          cardsList.map((value:CardInterface,index:number)=>{
            return(

              <div className="card-container">
                <div className="chip-logo">
                  <img src={chipsvg} alt="error"/>
                </div>
                <div className="card-number">
                  <span className="small-trans">card number</span>
                  <span className="large-bold">{value.cardNumber}</span>
      
                </div>
                <div className="custom-row">
                  <div className="custom-col card-holder">
                    <span className="small-trans">card holder name</span>
                    <span>{value.name}</span>
                  </div>
                  <div className="custom-col card-holder" style={{marginLeft:"80px"}}>
                    <span className="small-trans">VALID THRU</span>
                    <span>{value.month}/{value.year}</span>
                  </div>
              </div>
    
            </div>
              
            )
          })
          }
          
        </div>
          <button onClick={()=>{setdisplay(true)}} id="myBtn">Open Modal</button>
          <div id="myModal" className={"modal "+(display?"display-modal":"hide-modal")}>
            
            <div className="modal-content">
              <div className="header">
                <span onClick={()=>{setdisplay(false)}} className="close">&times;</span>
              </div>
              <div className="modal-body">
                <div className="card-form">
                  <label htmlFor="name">Name</label>
                  <input className="input-field" name="name" type="text" />
                  <label >Card Number</label>
                  <CardNumber setCardNumber={(number:string)=>{setcardNumber(number)}}/>
                  <div className="expiry-cvv">
                    <div className="card-form expiry-div">
                        <label htmlFor="valid-thru">VALID THRU (mm/yy)</label>
                        <div className="custom-row expiry-cvv-input-div">
                          <input onChange={(event)=>{limitLength(event.target.value,"month")}} className="input-field expiry-cvv-input " name="valid-thru" type="number" />
                          <span className="large-bold">/</span>
                          <input onChange={(event)=>{limitLength(event.target.value,"year")}} className="input-field expiry-cvv-input " name="valid-thru" type="number" />
                        </div>
                    </div>
                    <div className="cvv-div">
                      <label htmlFor="cvv">CVV</label>
                      <input className="input-field expiry-cvv-input expiry-cvv-input-div" style={{width:"100px"}} name="cvv" type="number" />
                    </div>

                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="full-width-btn">Add New Card</button>
              </div>
            </div>
          </div>
      </div>
      </div>
  );
}

export default SavedCards;
