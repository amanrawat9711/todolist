import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { images } from "./assets/assets";
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { CiSaveUp1 } from "react-icons/ci";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

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
    localStorage.setItem("todo", JSON.stringify(result));
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

  const updateTodo = (index, newTaskText) => {
    if (newTaskText.trim()) {
      const updatedTodo = todo.map((task, idx) =>
        idx === index ? newTaskText : task
      );
      setTodo(updatedTodo);
      setCurrentTaskIndex(null); 
      toast.success("Task updated successfully!");
    } else {
      toast.error("Task cannot be empty!");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${images})` }}
        ></div>

        <div className="border-2 p-5 sm:p-10 border-pink-800 bg-white bg-opacity-80 w-full max-w-lg rounded-lg shadow-lg z-10">
          <div className="flex items-center gap-3 w-full">
            <input
              className="border-2 border-pink-800 text-center w-full h-[40px] text-pink-700 rounded-md px-3"
              type="text"
              placeholder="Enter a new task"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              className="cursor-pointer text-pink-500 border border-pink-500 rounded-full p-2 hover:bg-pink-100"
              onClick={addTask}
            >
              <IoAdd size={20} />
            </button>
          </div>

          <div className="max-w-full w-full mt-5 space-y-3">
            {todo.map((item, index) => (
              <div
                className="border-2 border-pink-800 flex justify-between items-center p-2 w-full rounded-md"
                key={index}
              >
                {currentTaskIndex === index ? (
                  <div
                    className="w-4/5 text-pink-700"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateTodo(index, e.target.innerText)} 
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ) : (
                  <p className="break-words w-4/5 text-pink-700">{item}</p>
                )}
                {currentTaskIndex === index ? (
                  <CiSaveUp1
                    onClick={() => setCurrentTaskIndex(null)} 
                    className="text-green-500 cursor-pointer"
                  />
                ) : (
                  <FaRegEdit
                    onClick={() => setCurrentTaskIndex(index)} 
                    className="text-red-700 cursor-pointer"
                  />
                )}

                {/* Delete Button */}
                <MdDelete
                  className="text-red-500 cursor-pointer hover:text-red-700 transition-transform transform hover:scale-110"
                  onClick={() => deleteTodo(index)}
                />
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
