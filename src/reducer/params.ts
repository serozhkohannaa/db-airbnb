import { GET_TYPES, GET_CANCELLATION_POLICY } from "../constants/action-types";
import { ParamsInterfaces } from "../constants/params.interfaces";

const initialState: ParamsInterfaces = {
  propertyTypes: [],
  cancellation_policy: [],
}

export default function params(state = initialState, action) {
  switch (action.type) {
	case GET_TYPES:
	  return {
	    ...state,
	    propertyTypes: action.payload
	  }
	case GET_CANCELLATION_POLICY:
	  return {
	    ...state,
	    cancellation_policy: action.payload
	  }
  }
  return state;
}