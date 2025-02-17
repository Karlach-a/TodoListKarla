import React from "react";
import { useState,useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./todo/Todo";
import { db } from "./firebase/firebase";
import { query,collection, onSnapshot, updateDoc,addDoc,deleteDoc,doc} from "firebase/firestore";

const style ={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to -[#1cb5e0]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading:`text-3xl font-bold text-center text-gray-800 p-2`,
  form:`flex justify-between`,
  input:`border p-2 w-full text-xl `,
  button:`border p-4 ml-2 bg-purple-500 text-slate-100`,
  count:'text-center'

}

function App() {
  
const[todos,setTodos]= useState([]);
const[input,setInput]=useState('');



//Crearemos todo

const createTodo = async(e) =>{
  e.preventDefault(e);
  if(input === ''){
    alert('Por favor Digita un valor valido')
    return
  }

  await addDoc(collection(db,'todos'),{
    text: input,
    completed:false,
  })

  setInput('')

  

}
//leeremos

useEffect(()=> {
const q= query(collection(db,'todos'))
const unsubscribe = onSnapshot(q,(querySnapshot) =>{
  let todosArr=[]
  querySnapshot.forEach((doc) => {
    todosArr.push({...doc.data(), id:doc.id})
  });

  setTodos(todosArr)

})

return () => unsubscribe()
},[])

//actualizamos desde firebase
const toggleComplete = async(todo)=>{
  await updateDoc(doc(db,'todos',todo.id),{
    completed: !todo.completed
  })

}

// borrar todo 

const deleteTodo = async (id) =>{
  await deleteDoc(doc(db,'todos',id))
}



  return (
    <>
      <div className={style.bg}>

        <div className={style.container}>
          <h3 classname={style.heading}> ToDo List</h3>
          <form onSubmit={createTodo} className={style.form}>
            <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
          <button className={style.button}><AiOutlinePlus size={30}/></button>
         
          </form>
          <ul>
            {todos.map((todo, index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            ) )}
             
          </ul>
          {todos.length <  1 ? null  :  <p className={style.count}>{`tu tiene ${todos.length} todos`}</p> }
         
        </div>
      </div>
    </>
  )
}

export default App
