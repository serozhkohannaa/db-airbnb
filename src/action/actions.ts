import { SET_FILTERS_OPEN, GET_TYPES, GET_CANCELLATION_POLICY } from "../constants/action-types";
import axios from 'axios';

export const setFiltersOpen = payload => ({
  type: SET_FILTERS_OPEN,
  payload
})

export const getTypes = () => {
  let url = 'http://localhost:5000/listingsAndReviews/get/propertyTypes';

  return dispatch => {
	axios.get(url)
	  .then(response => {
		dispatch({
		  type: GET_TYPES,
		  payload: response.data
		})
	  })
  }
}
export const getCancellationPolicy = () => {
  let url = 'http://localhost:5000/listingsAndReviews/get/cancellation_policy';

  return dispatch => {
	axios.get(url)
	  .then(response => {
		dispatch({
		  type: GET_CANCELLATION_POLICY,
		  payload: response.data
		})
	  })
  }
}

