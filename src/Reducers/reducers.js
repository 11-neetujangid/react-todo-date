import {
    SET_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, CHECK_BOX_DATA, UN_MARK_TODOS, COMPLETED, CHECK_VALUE, SELECTED_DATE_DATA, complete,
} from "../Actions/action";

const initialState = {
    todo: {
        title: '',
        description: '',
    },
    todos: [],
    mark: [],
    complete: [],
    check: ''
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO:
            console.log(action.payload);

            return {
                ...state,
                todo: action.payload,
            }
        case ADD_TODO:
            const todos = [...state.todos, action.payload];
            localStorage.setItem('todo', JSON.stringify(todos));
            return {
                ...state,
                todos,
                todo: initialState.todo,
            }
        case UPDATE_TODO:
            console.log(action.payload.id);
            return {
                ...state,
                todo: initialState.todo,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return { ...todo, ...action.payload };
                    }
                    return todo;
                }),
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
            }
        case CHECK_BOX_DATA:
            let mark = [...state.mark, action.payload]
            console.log(mark)
            return {
                ...state,
                mark,
            }
        case COMPLETED:
            console.log(action.payload)
            return {
                ...state,
                complete: action.payload,
                todos: state.todos.filter((todo) => todo.id === action.payload.id),
            }
        case CHECK_VALUE:
            console.log(action.payload)
            return {
                ...state,
                check: action.payload
            }
        case SELECTED_DATE_DATA:
            console.log(action.payload.selectDate)
            let value = state.complete.map((data) => data.duedate)
            console.log(value)
            return {
                ...state,
                complete: state.complete.filter((todo) =>
                    todo.duedate === action.payload.selectDate
                )
            }
        default:
            return state;
    }
}
export default reducer;