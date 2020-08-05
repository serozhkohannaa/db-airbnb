import { combineReducers } from "redux";
import application from "./application";
import params from "./params";

const reducer = combineReducers({
  application,
  params
})

export default reducer;