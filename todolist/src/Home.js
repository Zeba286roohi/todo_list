import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
const Home = () => {
    const location = useLocation();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' +id)
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err));
    }
const handleDelete=(id)=>{
    axios.delete('http://localhost:3001/delete/' +id)
    .then(result => {
      location.reload() 
    })
    .catch(err => console.log(err));
}
    return (
        <div>
            <h3>To-do List</h3>
            <Create />
            {todos.length === 0 ? (
                <div>
                    <h2>No Record found</h2>
                </div>
            ) : (
                todos.map((todo, index) => (
                    <div className='task' key={index}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsCheckCircleFill className='icon'></BsCheckCircleFill>
                                : <BsCircleFill className='icon' />
                            }
                            <p className={todo.task ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)} />
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
