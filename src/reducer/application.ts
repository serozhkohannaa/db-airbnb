import { SET_FILTERS_OPEN, SET_LOADER } from "../constants/action-types";
import { ApplicationInterface } from "../constants/application.interface";

const initialState: ApplicationInterface = {
  isOpen: false,
  maxLimit: 10,
  hasLoader: false
}

export default function application(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS_OPEN:
      return {
        ...state,
        isOpen: action.payload
      }
    case SET_LOADER:
      return {
        ...state,
        hasLoader: action.payload
      }
  }
  return state
}