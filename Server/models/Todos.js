import mongoose from "mongoose";

// Making Schema 
const TodoSchema = new mongoose.Schema({
    // To set the default
    todo: String,
    isDone: Boolean,
  });

export  const Todo = mongoose.model('Todo', TodoSchema,"Todo_App_React");

