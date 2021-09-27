import {
    SET_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, CHECK_BOX_DATA, COMPLETED, CHECK_VALUE, SELECTED_DATE_DATA,
} from "../Actions/action";

const initialState = {
    todo: {
        title: '',
        description: '',
    },
    todos: [],
    mark: [],
    complete: [],
    check: '',
    select: []
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
            localStorage.setItem('complete', JSON.stringify(action.payload))
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
            const data = JSON.parse(localStorage.getItem('complete'));
            const todoData = JSON.parse(localStorage.getItem('todo'));
            console.log(todoData)
            return {
                ...state,
                complete: data.filter((todo) => (
                    todo.duedate === action.payload.selectDate
                )),
                todos: todoData.filter((todo) => todo.duedate === action.payload.selectDate)
            }
        default:
            return state;
    }
}
export default reducer;