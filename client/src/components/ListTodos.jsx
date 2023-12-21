import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id) => {
    setSelectedTodoId(id);
  };

  const handleCloseEdit = () => {
    setSelectedTodoId(null);
  };

  return (
    <div className="">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead>
          <tr>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Edit</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td className="px-6 py-4">{todo.description}</td>
              <td className="px-1 py-1">
                <Button onClick={() => handleEditClick(todo.todo_id)}>
                  Edit
                </Button>
              </td>
              <td className="px-1 py-1">
                <Button
                  variant="destructive"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodoId !== null && (
        <EditTodo
          isVisible={true}
          onClose={handleCloseEdit}
          todo={todos.find((todo) => todo.todo_id === selectedTodoId)}
        />
      )}
    </div>
  );
};

export default ListTodos;
