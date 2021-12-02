import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import cardReducer  from "./cardNumberReducer";

export const store=createStore(cardReducer, composeWithDevTools());