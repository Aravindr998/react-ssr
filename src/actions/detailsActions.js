import "isomorphic-fetch";

import {
  DETAILS_LOADING,
  DETAILS_SUCCESS,
  DETAILS_FAILURE,
} from "../actionTypes/detailsTypes";

export const detailsLoading = () => {
    return {
        type: DETAILS_LOADING
    }
}

export const detailsSuccess = (details) => {
    return {
        type: DETAILS_SUCCESS,
        payload: details
    }
}

export const detailsFailure = (error) => {
    return {
        type: DETAILS_FAILURE,
        payload: error
    }
}

export const fetchDetails = (id) => (dispatch, getState) => {
    dispatch(detailsLoading())
    return fetch(`https://dummyjson.com/products/${id}`)
    .then((response) => response.json())
    .then((details) => {
        dispatch(detailsSuccess(details))
    })
    .catch((error) => dispatch(detailsFailure(error)))
}