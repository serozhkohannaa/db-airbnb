import { SET_FILTERS_OPEN } from "../constants/action-types";
import { ApplicationInterface } from "../constants/application.interface";

const initialState: ApplicationInterface = {
  isOpen: false
}

export default function application(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS_OPEN:
      return {
        isOpen: action.payload
      }
  }
  return state
}