import { GET_TYPES, GET_CANCELLATION_POLICY, SET_MAX_PRICE, SET_SORT } from "../constants/action-types";
import { ParamsInterfaces } from "../constants/params.interfaces";

const initialState: ParamsInterfaces = {
  property_type: [],
  cancellation_policy: [],
  price: 0,
  isHighScored: false,
  sortPrice: 1
}

export default function params(state = initialState, action) {
  switch (action.type) {
	case GET_TYPES:
	  return {
	    ...state,
		property_type: action.payload
	  }
	case GET_CANCELLATION_POLICY:
	  return {
	    ...state,
	    cancellation_policy: action.payload
	  }

	case SET_MAX_PRICE:
	  return {
	    ...state,
		price: action.payload
	  }

	case SET_SORT:
	  return  {
	    ...state,
		sortPrice: action.payload
	  }
  }
  return state;
}