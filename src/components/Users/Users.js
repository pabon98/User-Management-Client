import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css'

const Users = () => {
    const[users, setUsers] = useState([])
    useEffect( ()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    },[])
    //Deleting an user
    const handleDeleteUser =(id)=>{
       const proceed = window.confirm('Are you sure you want to Delete?')
       if(proceed){
        const url =`http://localhost:5000/users/${id}`
        fetch(url, {
            method:'DELETE'
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.deletedCount>0){
                alert('Deleted Successfully')
                const remainingUsers = users.filter(user=> user._id !== id)
                setUsers(remainingUsers)
            }
        })
       }
    }
    return (
        <div className='users'>
            <h2>Users Available {users.length}</h2>
            <ul>
                {
                    users.map(user=><li key={user._id}>
                        {user.name} :: {user.email} <br />
                       <Link to={`/users/update/${user._id}`}> <button className='btn btn-success my-2'>Update</button></Link>
                        <button onClick={()=> handleDeleteUser(user._id)} className='btn btn-danger ms-2'>Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;