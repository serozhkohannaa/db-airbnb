import { GET_TYPES } from "../constants/action-types";
import { ParamsInterfaces } from "../constants/params.interfaces";

const initialState: ParamsInterfaces = {
  propertyTypes: []
}

export default function params(state = initialState, action) {
  switch (action.type) {
	case GET_TYPES:
	  return {propertyTypes: action.payload}
  }
  return state;
}