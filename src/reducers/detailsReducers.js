import { DETAILS_LOADING, DETAILS_SUCCESS, DETAILS_FAILURE } from "../actionTypes/detailsTypes";

const initialState = {
    loading: false,
    details: {},
    error: {}
}

const detailsReducer = (state = initialState, action) => {
    switch(action.type){
        case DETAILS_LOADING:
            return {
                ...state,
                loading: true
            }
        case DETAILS_SUCCESS:
            return {
                loading: false,
                details: action.payload,
                error: {}
            }
        case DETAILS_FAILURE:
            return {
                loading: false,
                details: {},
                error: action.payload
            }
        default:
            return state
    }
}

export default detailsReducer