import { GET_TYPES } from "../../constants/action-types";

export const typesFormatting = store => next => action => {
  const {type, payload} = action;

  if (type === GET_TYPES) {
    const typesUnique = new Set(payload.map(item => item.property_type));

    const newAction = {...action, payload: [...typesUnique]};
    next(newAction);
  } else {
    next(action);
  }
}