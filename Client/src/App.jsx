import { useState, useMemo } from 'react'
import { useForm } from "react-hook-form"
import Navbar from './components/Navbar'
import Todo from './components/Todo'
import logo from "/images/image_2.png"
import { useEffect } from 'react'

function App() {

  const [docs, setDocs] = useState([])
  const [isedit, setisedit] = useState(false)
  const [prev_todo, setprev_todo] = useState("")
  const [filtered_docs, setfiltered_docs] = useState([])


  const {
    register,
    resetField,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {

    if (isedit === false) {
      data.isDone = false
      await fetch("http://localhost:3000/send",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } else if (isedit === true) {


      await fetch(`http://localhost:3000/update/${prev_todo}/${data.todo}`,
        {
          method: "PUT"
        }
      )
      setisedit(false)
    }

    resetField('todo')

    const fetchData = async () => {
      let r = await fetch_docs();
      setDocs(r)
    }

    fetchData();

  }


  const fetch_docs = async () => {
    let r = await fetch("http://localhost:3000/fetch_docs")
    return await r.json()
  }

  useEffect(() => {
    const fetchData = async () => {
      let r = await fetch_docs();
      setDocs(r)
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className='flex flex-col items-center select-none border-2 border-black md:my-5 min-h-[100vh] md:min-h-[80vh] bg-purple-400 md:w-[75%] mx-auto md:rounded-3xl '>

        <div className='Todo_top_Bar border-2  border-black  bg-violet-500 my-5 w-[70%] font-bold text-2xl flex justify-center p-4 rounded-3xl text-white gap-6 '>
          <img src={logo} alt="" className='h-8' />
          <h2 className='font-Ballo_Bhai'>Todo List</h2>
        </div>

        <hr className='bg-white h-0.5 w-[95%]' />

        <div className='Form_input my-4 w-[60vw] flex flex-col items-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center gap-3 my-3'>
            <input {...register("todo", { required: true })} className='rounded-full font-bold text-lg border-none outline-none py-1 px-2  md:w-[40vw] cursor-pointer' placeholder='Add Your Todo Here' />
            <input type="submit" value={isedit ? "Update" : "Add"} className='bg-purple-600 text-xl font-bold rounded-lg px-4 py-0.5 hover:bg-black text-white hover:scale-105 transition-transform ease-in cursor-pointer' />

          </form>
          {isSubmitting && <div className='text-2xl font-bold'>Subniting Todo ...</div>}
        </div>


        <div className="your_todos border-2 border-black bg-purple-300 md:w-[60vw] min-h-[50vh] max-h-[50vh]
         overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-gray-300 rounded-xl my-2">
          {
            docs.map((doc) => {
              {
                return (
                  <div className="todo">
                    <Todo desc={doc.todo} key={doc._id} _id={doc._id} fetchdocs={fetch_docs} setdocs={setDocs} setValue={setValue} setFocus={setFocus} setisedit={setisedit} setprev_todo={setprev_todo} isDone={doc.isDone} />
                  </div>
                )
              }
            })
          }

        </div>

      </div>
    </>
  )
}

export default App
