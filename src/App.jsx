import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { images } from "./assets/assets";
import { IoAdd } from "react-icons/io5";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTodo([...todo, input]);
      setInput("");
      toast.success("Task added successfully!");
    } else {
      toast.error("Please enter a task!");
    }
  };

  const deleteTodo = (indexToDelete) => {
    const result = todo.filter((_, index) => index !== indexToDelete);
    setTodo(result);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todo"));
    if (storedTasks) {
      setTodo(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (todo.length > 0) {
      localStorage.setItem("todo", JSON.stringify(todo));
    }
  }, [todo]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
      <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${images})` }}
        ></div>
        <div className="border-2 p-10 border-pink-800">
        <div className="flex items-center gap-5 w-full max-w-xl">
          <input
            className=" border-pink-800 border-2 text-center w-full h-[40px] text-pink-700"
            type="text"
            placeholder="Enter a new task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="cursor-pointer text-pink-500 border rounded-full"  onClick={addTask}><IoAdd/></button>
        </div>
        <div className="max-w-xl min-w-md w-full mt-5 ">
          {todo.map((item, index) => (
            <div
              className="mt-2 border-2 border-pink-800 flex justify-between items-center p-2 w-full"
              key={index}
            >
              <p className="break-words w-3/4 text-pink-700">{item}</p>
              <MdDelete className="text-red-500 cursor-pointer mr-[50px]" onClick={()=>deleteTodo(index)} />
            </div>
          ))}
        </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
