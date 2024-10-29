import { FaListCheck } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTodo(todo) {
    setTodos((todos) => [...todos, todo]);
  }

  function handleTodoCheck(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#ebebeb]">
      <div className="w-full md:w-[60%] relative h-full md:h-[83%] shadow-md bg-white flex-col">
        <Header />
        <Form onAddTodo={handleAddTodo} />
        <Todos
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onToggleCheck={handleTodoCheck}
        />
        <Stats todos={todos} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="w-full h-[70px] items-center bg-[#89a1ef] gap-3 flex justify-center">
      <h1 className="text-2xl md:text-3xl font-bold">Todo App</h1>
      <FaListCheck size={25} />
    </div>
  );
}

function Form({ onAddTodo }) {
  const [description, setDescription] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newTodo = { description, done: false, id: Date.now() };
    onAddTodo(newTodo);
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-[30px] h-fit flex justify-center"
    >
      <div className="w-[90%] flex justify-between">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="border border-gray-600 px-3 outline-none rounded-lg py-1 bg-transparent w-[65%] md:w-[80%]"
          placeholder="Add new todo..."
        />
        <button className="bg-[#89a1ef]  px-[30px] rounded-md shadow-lg">
          Add
        </button>
      </div>
    </form>
  );
}

function Todos({ todos, onDeleteTodo, onToggleCheck }) {
  return (
    <div className="w-full h-[72%] md:h-[60%] overflow-y-scroll mt-[30px] justify-center items-center flex">
      <ul className="w-[90%] h-full flex gap-7 flex-col">
        {todos.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteTodo={onDeleteTodo}
            onToggleCheck={onToggleCheck}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteTodo, onToggleCheck }) {
  return (
    <li className="flex flex-row justify-between w-full border p-4 rounded-md border-[#89a1ef]">
      <span className="flex flex-row gap-2">
        <input
          type="checkbox"
          value={item.done}
          onChange={() => onToggleCheck(item.id)}
        />
        <p style={item.done ? { textDecoration: "line-through" } : {}}>
          {item.description}
        </p>
      </span>

      <button onClick={() => onDeleteTodo(item.id)}>
        <BsTrash3Fill className="text-red-600" />
      </button>
    </li>
  );
}

function Stats({ todos }) {
  if (!todos.length)
    return (
      <p className="w-full md:text-sm text-xs absolute bottom-0 bg-[#89a1ef] flex justify-center  items-center text-center py-4 md:py-2">
        😍Start adding todos to your TodoApp!😍
      </p>
    );
  const numTodos = todos.length;
  const numCompleted = todos.filter((todo) => todo.done).length;
  const Percentage = Math.round((numCompleted / numTodos) * 100);
  return (
    <div className="w-full  bg-[#89a1ef] flex justify-center absolute bottom-0 items-center text-center py-4 md:py-2overflow-hidden text-wrap md:text-sm text-xs">
      {Percentage === 100 ? (
        <p> 😍You have completed your Todos!🎉</p>
      ) : (
        <em>
          😍 You have {numTodos} todos in your list and have completed{" "}
          {numCompleted} ({Percentage}%) 🥰
        </em>
      )}
    </div>
  );
}
