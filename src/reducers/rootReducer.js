import { combineReducers } from "redux";
import productReducer from "./productReducers";
import detailsReducer from "./detailsReducers";

const createRootReducer = () => {
    return combineReducers({
        allProducts: productReducer,
        details: detailsReducer
    })
}

export default createRootReducer