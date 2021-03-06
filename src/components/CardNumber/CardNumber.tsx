import React,{useState,useEffect} from 'react';

import './CardNumber.css';
export interface CardNumberState{
    setCardNumber:Function
    clearValue:number,
    noOfInputBlock:number
}

/* component for inputing debit or credit card numbers */

function CardNumber(props:CardNumberState) {
    const totalNumberOfBlock:number=props.noOfInputBlock                                   // variable used for saving number of blocks inside card number input
    const [inputValue, setinputValue] = useState(new Array(totalNumberOfBlock*4).fill("")) // state variable used for saving input values
    const [elemRefs, setelemRefs] = useState(new Array(totalNumberOfBlock*4))              // arry using for saving array of references 
    const [focusindex, setfocusindex] = useState(0)                                        // state used to set the focus for input

    //initializing references for input field
    useEffect(() => {
        for(var i:number =0;i< totalNumberOfBlock*4;i++){
            elemRefs[i]=React.createRef()
        }
    }, [])

    //seting focus for an input
    useEffect(() => {
        if(elemRefs[focusindex].current){
            elemRefs[focusindex].current.focus()  
        }
   }, [focusindex,elemRefs]);

   //clearing input values while closing
   useEffect(() => {
       if(props.clearValue){
           setinputValue(new Array(totalNumberOfBlock*4).fill(""))
       }
    }, [props.clearValue]);

    //function for saving input values , limiting input feild length , transfering focus to next input field
    const onchangeOfInput=(id:string,value:string)=>{
        try {
            let fieldNumber=Number(id[6])
            let blockNumber=Number(id[8])
            console.log("avlue",value)
            let temp
            if(value){
                temp=inputValue
                temp[blockNumber*totalNumberOfBlock+fieldNumber]=value.slice(0,1)
                console.log(blockNumber,fieldNumber)
                console.log(value.slice(0,1))
                setinputValue([...temp])
                if(fieldNumber<3){
                    fieldNumber+=1
                    onchangeOfInput("input_"+fieldNumber+"_"+blockNumber,value.slice(1))  
                }
                else if(blockNumber<totalNumberOfBlock-1){
                    blockNumber+=1
                    fieldNumber=0
                    onchangeOfInput("input_"+fieldNumber+"_"+blockNumber,value.slice(1))  
                }
                 
            }
            else{
                temp=inputValue
                temp[blockNumber*totalNumberOfBlock+fieldNumber]=""
                setinputValue([...temp])
                setfocusindex(blockNumber*totalNumberOfBlock+fieldNumber)
                
            }
            console.log(temp.join(""))
            props.setCardNumber(temp.join(""))

        } catch (error) {
            
        }
        
    }

    //function for deleting values while clicking on backspace
    const OnBackSpaceClick=(event: React.KeyboardEvent<HTMLInputElement>,id:string)=>{
        if (event.key==='Backspace'){
            console.log("backspace",event.key,id)
            let fieldNumber=Number(id[6])
            let blockNumber=Number(id[8])
            let temp=inputValue
            temp[blockNumber*totalNumberOfBlock+fieldNumber]=""
            if(!(blockNumber===0 && fieldNumber===0)){
                if(fieldNumber>0){
                    fieldNumber=fieldNumber-1
                }
                else{
                    blockNumber=blockNumber-1
                    fieldNumber=totalNumberOfBlock-1
                }
            }
            setfocusindex(blockNumber*totalNumberOfBlock+fieldNumber)
        }
    }
      const Input = (props: { fieldNumber: any; value: string | number | readonly string[] | undefined; id: string | undefined; type: string | (string & {}) | undefined; }) => {
        const ref= elemRefs[Number(props.fieldNumber)];
        return (
          <input
            ref={ref}
            value={props.value}
            onChange={(event)=>{onchangeOfInput(event.target.id,event.target.value)}}
            onKeyDown={(event)=>{OnBackSpaceClick(event,event.currentTarget.id)}}
            id={props.id}
            className="card-number-col"
            type={props.type}
          />
        );
      };
    
  return (
      <div className="blocks-group">
           {
               [...Array(totalNumberOfBlock)].map((value,index)=>{
                   return(
                    <div key={"div_"+index} className="card-number-block">
                        <Input fieldNumber={index*totalNumberOfBlock+0}  value={inputValue[index*totalNumberOfBlock+0]}  id={"input_0_"+index}  type="number" />
                        <Input fieldNumber={index*totalNumberOfBlock+1}  value={inputValue[index*totalNumberOfBlock+1]}  id={"input_1_"+index}  type="number" />
                        <Input fieldNumber={index*totalNumberOfBlock+2}  value={inputValue[index*totalNumberOfBlock+2]}  id={"input_2_"+index}  type="number" />
                        <Input fieldNumber={index*totalNumberOfBlock+3}  value={inputValue[index*totalNumberOfBlock+3]}  id={"input_3_"+index}  type="number" />
                    </div>
                   )
               })
            }
      </div>
     
    
    
  );
}

export default CardNumber;
