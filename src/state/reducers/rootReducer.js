import { combineReducers } from "redux";
import quantityReducer from "./quantityReducer";

const rootReducer=combineReducers({
    number:quantityReducer
})

export default rootReducer;