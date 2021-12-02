import React, { useState } from 'react';
import CardNumber from "../CardNumber/CardNumber";
import './SavedCards.css';



function SavedCards() {
    const [display, setdisplay] = useState(false)
    const [inputValues, setinputValues] = useState({})
    const [cardNumber, setcardNumber] = useState("")
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
          <button onClick={()=>{setdisplay(true)}} id="myBtn">Open Modal</button>
          <div id="myModal" className={"modal "+(display?"display-modal":"hide-modal")}>
            
            <div className="modal-content">
              <div>
                <span onClick={()=>{setdisplay(false)}} className="close">&times;</span>
              </div>
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
          </div>
      </div>
  );
}

export default SavedCards;
