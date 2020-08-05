import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducer";
import { typesFormatting } from "./middleware/typesFormatting";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, typesFormatting))
)

export default store;