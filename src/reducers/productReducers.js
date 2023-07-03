import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_FAILED } from "../actionTypes/productTypes";

const initialState = {
    loading: false,
    products: [],
    error: {}
}

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                error: ''
            }
        case PRODUCT_FAILED:
            return {
                loading: false,
                products: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default productReducer