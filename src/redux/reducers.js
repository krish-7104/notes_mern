import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, USER_TOKEN } from "./action";

export const Reducers = (state = { user: "", notes: [] }, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case UPDATE_NOTE:
      for (let i = 0; i < state.length; i++) {
        const element = state[i];
        if (element._id === action.payload.id) {
          element.title = action.payload.title;
          element.description = action.payload.description;
          element.tag = action.payload.tag;
          element.timestamp = Date.now();
        }
      }
      return state;
    case USER_TOKEN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
