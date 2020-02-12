const INIT_STATE = {}

export default function(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch(type) {
    case 'ADD_NAME': {
      return { ...state, name: payload }
    }
    default:
      return state;
  }
}