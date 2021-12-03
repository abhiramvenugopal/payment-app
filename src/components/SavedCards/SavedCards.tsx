import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardInterface, CardState } from '../../redux/cardNumberReducer';
import CardNumber from "../CardNumber/CardNumber";
import chipsvg from "../../assets/chip.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import './SavedCards.css';


/* component for listing all saved cards and adding new card to the list */

function SavedCards() {
    const cards:CardInterface[] =useSelector<CardState,CardInterface[]>((state)=>state.cards)
    const [display, setdisplay] = useState(false)                           // state variable for controlling modal 
    const [inputValues, setinputValues] = useState({} as CardInterface)     // state variable for saving all input values
    const [cardNumber, setcardNumber] = useState("")                        // state variable for saving card number getting from cardNumber component
    const [cardsList, setcardsList] = useState(cards)                       // state variable for saving list of saved cards
    var [clearValue, setclearValue] = useState(0)                           // state variable for clearing values of form
    const [checkInput, setcheckInput] = useState(false)                     


    
    const dispatch = useDispatch()
    const addCard= (cards:CardInterface[])=>{
      dispatch({type:"UPDATE_CARD_LIST",payload:cards})
    }

    //copying card list from redux state
    useEffect(() => {
      let temp:CardInterface[]=[...cards]
      setcardsList(temp)
      
    }, [cards])

    //function for clearing input values
   const clearinput=()=>{
    setinputValues({} as CardInterface)
    setcardNumber("")
   }

   //function for removeing card from saved cards list
   const removecard=(index:number)=>{
     let temp=[...cardsList]
     temp=temp.filter((value:CardInterface,indx:number)=>{
       return (index!==indx)
     })
     setcardsList(temp)
   }


   //function limiting length of each input field and saving onchange of input to state variable
    const limitLength=(value:string,id:string)=>{
      let temp={...inputValues}
      if(id==="month"){
        temp={...inputValues,month:Number(value.slice(0,2))>12?"12":value.slice(0,2)}
      }
      if(id==="year"){
        temp={...inputValues,year:value.slice(0,2)}
      }
      if(id==="cvv"){
        temp={...inputValues,cvv:value.slice(0,3)}
      }
      if(id==="name"){
        temp={...inputValues,name:value}
      }
      setinputValues(temp)
      console.log(temp)
    }

    //function for adding card to saved cards list
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
        
        
        {/*display list  of cards saved */}
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
            {/* modal for inputing card details */}
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
                  <input value={inputValues.name?inputValues.name:""} onChange={(event)=>{limitLength(event.target.value,"name")}} style={{fontSize:"large",fontWeight:"bold"}} className="input-field input-field-border-black" name="name" type="text" />
                  <label >Card Number</label>
                  <CardNumber noOfInputBlock={4}  clearValue={clearValue} setCardNumber={(number:string)=>{setcardNumber(number)}}/>
                  <div className="expiry-cvv">
                    <div className="card-form expiry-div">
                        <label htmlFor="valid-thru">VALID THRU</label>
                        <div className="custom-row expiry-cvv-input-div">
                          <input value={inputValues.month?inputValues.month:""} onChange={(event)=>{limitLength(event.target.value,"month")}} className="input-field expiry-cvv-input " name="valid-thru" type="number" />
                          <span className="large-bold">/</span>
                          <input value={inputValues.year?inputValues.year:""} onChange={(event)=>{limitLength(event.target.value,"year")}} className="input-field expiry-cvv-input " name="valid-thru" type="number" />
                        </div>
                    </div>
                    <div className="cvv-div">
                      <label htmlFor="cvv">CVV</label>
                      <input value={inputValues.cvv?inputValues.cvv:""} onChange={(event)=>{limitLength(event.target.value,"cvv")}} className="input-field expiry-cvv-input expiry-cvv-input-div" style={{width:"100px"}} name="cvv" type="password" />
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
