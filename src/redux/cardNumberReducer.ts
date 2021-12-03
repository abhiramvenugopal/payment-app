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

type Action={type:"UPDATE_CARD_LIST", payload:CardInterface[]}
const cardReducer=(state:CardState=initalState,action:Action)=>{
    switch (action.type) {
        case "UPDATE_CARD_LIST":{
            return {...state,cards:[...action.payload]}
        }
        default:
            return state;
    }
}
export default cardReducer