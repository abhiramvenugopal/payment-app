export interface CardState{
    cardNumber:string[]
}
const initalState={
    cardNumber:[]
}

type Action={type:"ADD_CARD", payload:string}
const cardReducer=(state:CardState=initalState,action:Action)=>{
    switch (action.type) {
        case "ADD_CARD":{
            return {...state,cardNumber:[...state.cardNumber,action.payload]}
        }
        default:
            return state;
    }
}
export default cardReducer