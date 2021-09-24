export const SET_TODO = 'SET_TODO';
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CHECK_BOX_DATA = "CHECK_BOX_DATA";
export const COMPLETED = "COMPLETED";
export const CHECK_VALUE = "CHECK_VALUE";
export const  SELECTED_DATE_DATA= "SELECTED_DATE_DATA";

export const setTodo = (payload) => ({ type: SET_TODO, payload: payload });
export const addTodo = payload => ({ type: ADD_TODO, payload });
export const updateTodo = payload => ({ type: UPDATE_TODO, payload });
export const deleteTodo = payload => ({ type: DELETE_TODO, payload });
export const checkBoxData = (payload) => ({ type: CHECK_BOX_DATA, payload: payload })
export const complete = payload => ({ type: COMPLETED, payload });
export const checkValue = payload => ({ type: CHECK_VALUE, payload });
export const selectedDateData = payload => ({ type: SELECTED_DATE_DATA, payload });



