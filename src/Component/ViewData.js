import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
    updateTodo, deleteTodo, checkBoxData, setTodo, complete,
} from "../Actions/action";
import { useState } from "react";

const ViewData = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos)
    const todo = useSelector((state) => state.todo);
    const mark = useSelector((state) => state.mark);
    const checkValue = useSelector((state) => state.check);
    const completeData = useSelector((state) => state.complete);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    }
    const onChangeInput = (e) => {
        dispatch(setTodo({ ...todo, [e.target.name]: e.target.value }))
    }
    const clickUpdate = (id) => {
        dispatch(updateTodo({ ...todo, id, curTime: new Date().toLocaleString() + '' }));
        setShow(false);
    }
    const clickDelete = (todo) => {
        dispatch(deleteTodo(todo));
    }
    const onMark = (e, todo) => {
        let value = e.target.value
        let today = new Date();
        let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
        let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        dispatch(checkBoxData({ ...todo, check: value, date: date, time: time }));
    }
    const onClickCompleteButton = () => {
        dispatch(complete(mark));
    }
    return (
        <div className="App">
            {checkValue === "viewTodo" ?
                <>
                    <h2>Todos List</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>DueDate</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Mark</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map((todo) => {
                                    return (
                                        <tr key={todo.id}>
                                            <td>{todo.duedate}</td>
                                            <td>{todo.title}</td>
                                            <td> {todo.description}</td>
                                            <td>
                                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={(e) => onMark(e, todo)} />
                                            </td>
                                            <td>
                                                <Button variant="primary" onClick={handleShow}>Update</Button>
                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Update Todo </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <label htmlFor="exampleInput1">DueDate:</label>
                                                        <input type="text" className="form-control" defaultValue={todo.duedate} onChange={(e) => onChangeInput(e)} />
                                                        <label htmlFor="exampleInput1">Title:</label>
                                                        <input type="text" className="form-control" defaultValue={todo.title} name="title" placeholder="Title" onChange={(e) => onChangeInput(e)} />
                                                        <label htmlFor="exampleInput1">Description:</label>
                                                        <input type="text" className="form-control" defaultValue={todo.description} name="description" placeholder="Description" onChange={(e) => onChangeInput(e)} />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}> Close</Button>
                                                        <Button variant="primary" onClick={() => clickUpdate(todo.id)}>Submit</Button>
                                                    </Modal.Footer>
                                                </Modal>{' '}
                                                <Button variant="primary" onClick={() => clickDelete(todo)}>Delete </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <Button variant="primary" onClick={() => onClickCompleteButton()} >Completed</Button>
                </> :
                checkValue === "viewComplete" ?
                    <>
                        <h2>Completed List</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>DueDate</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Completed At:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    completeData.map((record) => {
                                        if (record.duedate >= record.date) {
                                            return (
                                                <tr key={record.id}>
                                                    <td>{record.duedate}</td>
                                                    <td>{record.title}</td>
                                                    <td>{record.description}</td>
                                                    <td>{record.date} Time: {record.time}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </> : checkValue === "viewOverdue" ?
                        <>
                            <h2>OverView</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Duedate</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Completed Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        completeData.map((record) => {
                                            console.log(record.duedate < record.time)
                                            if (record.duedate < record.date) {
                                                console.log("record")
                                                return (
                                                    <tr key={record.id}>
                                                        <td>{record.duedate}</td>
                                                        <td>{record.title}</td>
                                                        <td>{record.description}</td>
                                                        <td>{record.date} overdue</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </> : ""         
            }
        </div>
    )
}
export default ViewData;