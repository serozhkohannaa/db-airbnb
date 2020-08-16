import { SET_FILTERS_OPEN, GET_TYPES, GET_CANCELLATION_POLICY, SET_LOADER } from "../constants/action-types";
import axios from 'axios';
import { DEPLOY_URL } from "../services/host";

export const setFiltersOpen = payload => ({
  type: SET_FILTERS_OPEN,
  payload
})

export const getTypes = () => {
  let url = `${DEPLOY_URL}/get/propertyTypes`;

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
  let url = `${DEPLOY_URL}/get/cancellation_policy`;

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

export const setLoader = payload => ({
  type: SET_LOADER,
  payload
})

