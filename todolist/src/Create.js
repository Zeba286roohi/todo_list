import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Create = () => {
  const location = useLocation();
    const [tasks, setTasks] = useState('')

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { tasks: tasks })
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='create-form'>
            <input type='text' placeholder='Enter Task' onChange={(e) => setTasks(e.target.value)} />
            <button type='button' onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create;
