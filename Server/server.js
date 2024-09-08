import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {Todo} from "./models/Todos.js"

const app = express()
const port = 3000


// This is to avoid the error while submitting from frontend to backend
app.use(cors())
app.use(express.json())

let conn = await mongoose.connect('mongodb://localhost:27017/Sigma');

app.get('/', (req, res) => {
  res.send('Hello World!')  
})


app.post('/send', (req, res) => {
    const todo = new Todo({
        todo: req.body.todo,
        isDone: false,
    })
    todo.save()
  res.send()
})


app.get('/fetch_docs', async (req, res) => {
  res.send(await Todo.find({}))
})

// To update in Todo in Db
app.put('/update/:prev_todo/:todo', async (req, res) => {
  
  await Todo.updateOne({todo: req.params.prev_todo},{todo: req.params.todo})  
  res.send('DB Changed')
})


// To update isCheck in DB
app.put('/update_check/:todo/:isDone', async (req, res) => {
  const isDone = req.params.isDone === 'true'; 
  await Todo.updateOne({ todo: req.params.todo }, { isDone: isDone });  
  const updatedTodo = await Todo.findOne({ todo: req.params.todo });  
  res.json(updatedTodo);
});


// To delete in DB
app.delete('/delete_doc/:todo', async (req, res) => {
  await Todo.deleteOne({todo: req.params.todo})
  res.send(`Got a DELETE request ${req.params.todo}`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`)
})