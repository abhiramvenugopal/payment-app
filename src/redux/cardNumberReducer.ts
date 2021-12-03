export interface CardInterface{
    cardNumber:string
    year:string
    month:string
    cvv:string
    name:string
}
export interface CardState{
    cards:CardInterface[]
}
const initalState={
    cards:[]
}

type Action={type:"ADD_CARD", payload:CardInterface}
const cardReducer=(state:CardState=initalState,action:Action)=>{
    switch (action.type) {
        case "ADD_CARD":{
            return {...state,cards:[...state.cards,action.payload]}
        }
        default:
            return state;
    }
}
export default cardReducer