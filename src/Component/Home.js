import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { setTodo, addTodo, checkValue } from '../Actions/action';
import { useDispatch, useSelector } from 'react-redux';
import ViewData from './ViewData';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo)

    const onChangeInput = (e) => {
        dispatch(setTodo({ ...todo, [e.target.name]: e.target.value }))
    }
    const onChangeDate = (date) => {
        setStartDate(date)
        const today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        console.log(today)
        dispatch(setTodo({ ...todo, duedate: today }))
    }
    const onHandleClick = () => {
        const date = new Date();
        const today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        let time = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
        dispatch(addTodo({ ...todo, id: new Date().getTime(), curTime: today , time: time}));
        setShow(false);
    }
    const onChangeValue = (e) => {
        console.log(e.target.value);
        dispatch(checkValue(e.target.value));
    }
    return (
        <>
            <div>
                <Button variant="primary" onClick={handleShow}>Add Todo </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Todo here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="exampleInput1">duedate:</label>
                        <DatePicker selected={startDate} onChange={(date) => onChangeDate(date)} />
                        <label htmlFor="exampleInput1">Title:</label>
                        <input type="text" className="form-control" name="title" placeholder="Title" onChange={(e) => onChangeInput(e)} />
                        <label htmlFor="exampleInput1">Description:</label>
                        <input type="text" className="form-control" name="description" placeholder="Description" onChange={(e) => onChangeInput(e)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}> Close</Button>
                        <Button variant="primary" onClick={() => onHandleClick()}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div><br /><br />
            <div className="form-check" >
                <input className="form-check-inputvalue" type="radio" name="flexRadioDefault" value="viewTodo" id="flexRadioDefault1" onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    View Todos
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-inputvalue" type="radio" name="flexRadioDefault" value="viewComplete" id="flexRadioDefault2" onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    View completed
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-inputvalue" type="radio" name="flexRadioDefault" value="viewOverdue" id="flexRadioDefault2" onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Overdue
                </label>
            </div>
            <br /><br />
            <div className="split left">
                <ViewData />
            </div>
        </>
    )
}
export default Home;