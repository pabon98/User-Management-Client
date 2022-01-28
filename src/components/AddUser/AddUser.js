import React, { useRef } from 'react';
import './AddUser.css'

const AddUser = () => {
    const nameRef = useRef()
    const emailRef = useRef()

    const handleAddUser =(e)=>{
        const name = nameRef.current.value
        const email = emailRef.current.value

        const newUser = {name:name, email:email}
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                alert('User added successfully')
                e.target.reset()
            }
        })
        e.preventDefault()
    }
    return (
        <div className='AddUser'>
            <h2>Please Add an User </h2>
            <form onSubmit={handleAddUser}>
                <input className='name' ref={nameRef} type="text" name="" id="" />
                <input className='email' ref={emailRef} type="email" name="" id="" />
                <br />
                <button className='btn btn-success my-2'>Submit</button>
            </form>
        </div>
    );
};

export default AddUser;