import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardInterface, CardState } from '../../redux/cardNumberReducer';
import CardNumber from "../CardNumber/CardNumber";
import chipsvg from "../../assets/chip.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import './SavedCards.css';



function SavedCards() {
    const cards:CardInterface[] =useSelector<CardState,CardInterface[]>((state)=>state.cards)
    const [display, setdisplay] = useState(false)
    const [inputValues, setinputValues] = useState({} as CardInterface)
    const [cardNumber, setcardNumber] = useState("")
    const [cardsList, setcardsList] = useState(cards)
    var [clearValue, setclearValue] = useState(0)
    const [checkInput, setcheckInput] = useState(false)


    
    const dispatch = useDispatch()
    const addCard= (cards:CardInterface[])=>{
      dispatch({type:"UPDATE_CARD_LIST",payload:cards})
    }
    useEffect(() => {
      let temp:CardInterface[]=[...cards]
      setcardsList(temp)
      
    }, [cards])
   const clearinput=()=>{
     console.log("here iam")
    setinputValues({} as CardInterface)
    setcardNumber("")
   }
   const removecard=(index:number)=>{
     let temp=[...cardsList]
     temp=temp.filter((value:CardInterface,indx:number)=>{
       return (index!==indx)
     })
     setcardsList(temp)
   }


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
      if(id==="name"){
        temp={...inputValues,name:value}
      }
      setinputValues(temp)
      console.log(temp)
    }
    const addNewCard=()=>{
      let val=Boolean(inputValues.name && cardNumber && cardNumber.length===16 && inputValues.cvv && inputValues.cvv.length===3 && inputValues.month && inputValues.year)
      console.log(val)
      if(!(Boolean(inputValues.name && cardNumber && cardNumber.length===16 && inputValues.cvv && inputValues.cvv.length===3 && inputValues.month && inputValues.year))){
        setcheckInput(true)
        return
      }
      let cardObject:CardInterface={name:inputValues.name,cardNumber:cardNumber,month:inputValues.month,year:inputValues.year,cvv:inputValues.cvv}
      addCard([...cardsList,cardObject])
      setdisplay(false)
    }
    
  return (
    <div className="custom-col">
        <button onClick={()=>{setdisplay(true)
                              setclearValue(clearValue+1)
                              clearinput()
                              setcheckInput(false)
                                              }} className="add-newcard-button-div">
          +
        </button>
      <div className="container">
        
        
        
        <div className="saved-cards-container">
          {
          
          cardsList.map((value:CardInterface,index:number)=>{
            return(

              <div key={index} className="card-container">
                <div onClick={()=>{removecard(index)}} className="delete-icon">
                  <button style={{border:"none",backgroundColor:"transparent"}}><img src={deleteIcon} alt="error"/></button>   
                </div>   
                <div>
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
          <div id="myModal" className={"modal "+(display?"display-modal":"hide-modal")}>
            
            <div className="modal-content">
              <div className="header">
                <span onClick={()=>{setdisplay(false)}} className="close">&times;</span>
              </div>
              {
                checkInput &&
                <div>
                  <span>Enter All field values</span>
                </div>

              }
              
              <div className="modal-body">
                <div className="card-form">
                  <label htmlFor="name">Name</label>
                  <input value={inputValues.name?inputValues.name:""} onChange={(event)=>{limitLength(event.target.value,"name")}} className="input-field" name="name" type="text" />
                  <label >Card Number</label>
                  <CardNumber  clearValue={clearValue} setCardNumber={(number:string)=>{setcardNumber(number)}}/>
                  <div className="expiry-cvv">
                    <div className="card-form expiry-div">
                        <label htmlFor="valid-thru">VALID THRU (mm/yy)</label>
                        <div className="custom-row expiry-cvv-input-div">
                          <input value={inputValues.month?inputValues.month:""} onChange={(event)=>{limitLength(event.target.value,"month")}} className="input-field expiry-cvv-input " name="valid-thru" type="number" />
                          <span className="large-bold">/</span>
                          <input value={inputValues.year?inputValues.year:""} onChange={(event)=>{limitLength(event.target.value,"year")}} className="input-field expiry-cvv-input " name="valid-thru" type="number" />
                        </div>
                    </div>
                    <div className="cvv-div">
                      <label htmlFor="cvv">CVV</label>
                      <input value={inputValues.cvv?inputValues.cvv:""} onChange={(event)=>{limitLength(event.target.value,"cvv")}} className="input-field expiry-cvv-input expiry-cvv-input-div" style={{width:"100px"}} name="cvv" type="number" />
                    </div>

                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="full-width-btn" onClick={()=>{addNewCard()}}>Add New Card</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SavedCards;
