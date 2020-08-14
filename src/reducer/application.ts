import { SET_FILTERS_OPEN, GET_TOTAL_ITEMS } from "../constants/action-types";
import { ApplicationInterface } from "../constants/application.interface";

const initialState: ApplicationInterface = {
  isOpen: false,
  totalItems: 0,
  maxLimit: 10
}

export default function application(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS_OPEN:
      return {
        ...state,
        isOpen: action.payload
      }
    case GET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload
      }
  }
  return state
}