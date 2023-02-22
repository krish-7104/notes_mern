import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, USER_TOKEN } from "./action";

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
