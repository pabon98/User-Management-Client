import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UpdateUser = () => {
    const[user, setUser] = useState({})
    const{id} = useParams()
    useEffect( ()=>{
        const url =`http://localhost:5000/users/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data));
    },[id])
    //Update user
    const handleNameChange = (e)=>{
       const updatedName = e.target.value
       const updatedUser = {name: updatedName, email: user.email}
       setUser(updatedUser)
    //    setUser({...user, name: updatedName })
    }
    const handleEmailChange =(e)=>{
        const updatedEmail = e.target.value
        // const updatedUser = {...user}
        // updatedUser.email = updatedEmail
        const updatedUser ={name: user.name, email:updatedEmail}
        setUser(updatedUser)
       

    }
    const handleUpdateUser = (e)=>{
        const url =`http://localhost:5000/users/${id}`
        fetch(url,{
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=> res.json())
        .then(data=>{
           if(data.modifiedCount>0){
               alert('Updated User Successfully')
               setUser({})
           }
        })
     e.preventDefault()
    }
    return (
        <div>
            <h2>Update: {user.name} {user.email}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} name="" id="" />
                <input type="email" onChange={handleEmailChange} value={user.email || ''} name="" id="" />
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;