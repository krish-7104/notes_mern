import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  USER_TOKEN,
  SET_NOTES,
  EDIT_DATA,
} from "./action";

export const setNotes = (data) => ({
  type: SET_NOTES,
  payload: data,
});

export const addNewNote = (data) => ({
  type: ADD_NOTE,
  payload: data,
});

export const removeNote = (data) => ({
  type: REMOVE_NOTE,
  payload: data,
});

export const updateNote = (data) => ({
  type: UPDATE_NOTE,
  payload: data,
});

export const userDetails = (data) => ({
  type: USER_TOKEN,
  payload: data,
});

export const editDataHandler = (data) => ({
  type: EDIT_DATA,
  payload: data,
});
