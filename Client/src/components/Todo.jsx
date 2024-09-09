import React from 'react'
import { useState,useEffect } from 'react'

const Todo = (props) => {

  const [isDone,setisDone] = useState(props.isDone)

  const handleCheck = async (event) =>{
    setisDone(event.target.checked)
    await fetch(`http://localhost:3000/update_check/${props.desc}/${event.target.checked}`,{
      method: "PUT",
    })
  }

  const handleEdit = async () =>{
    props.setValue("todo",props.desc)
    props.setFocus("todo")
    props.setisedit(true)   
    props.setprev_todo(props.desc) 
  }

  const handleDelete = async () =>{
    await fetch(`http://localhost:3000/delete_doc/${props.desc}`,{
      method: 'DELETE'})
    await props.setdocs(await props.fetchdocs())
  }

  return (
    <div className=' font-bold px-5 py-5 flex justify-between '>
      <div className='flex items-center gap-2 max-w-[50%] md:max-w-2xl text-4xl font-Caveat '>
        <input type="checkbox" onChange={handleCheck} name="isDone" id={props._id} checked={isDone?true:false} 
        className="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor={props._id} className={`${isDone?"line-through":""}`} >{props.desc}</label>
      </div>
      <div className="btns">
        <button className='bg-purple-600 rounded-xl px-3 py-1 text-xl text-white cursor-pointer mx-1 hover:bg-black hover:scale-105 transition-all ease-in duration-75' onClick={handleEdit}>Edit</button>
        <button className='bg-purple-600 rounded-xl px-3 py-1 text-xl text-white cursor-pointer mx-1 hover:bg-black hover:scale-105 transition-all ease-in duration-75' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Todo
