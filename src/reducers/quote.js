import RECEIVE_QUOTE from "../actions/quote";

export default function quotes(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUOTE:
      return {
        ...state,
        ...action.quotes,
      };

     

    default:
      return state;
  }
}
