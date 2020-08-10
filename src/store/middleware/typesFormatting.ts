import { GET_TYPES, GET_CANCELLATION_POLICY } from "../../constants/action-types";

export const typesFormatting = store => next => action => {
  const {type, payload} = action;

  if (type === GET_TYPES) {
    const typesUnique = new Set(payload.map(item => item.property_type));

    const newAction = {...action, payload: [...typesUnique]};
    next(newAction);
  } else if (type === GET_CANCELLATION_POLICY) {
    const cancellation_policyUnique = new Set(payload.map(item => item.cancellation_policy));

    const newAction = {...action, payload: [...cancellation_policyUnique]};
    next(newAction);
  } else {
    next(action);
  }
}