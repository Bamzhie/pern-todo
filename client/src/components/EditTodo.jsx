import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EditTodo = ({ isVisible, onClose, todo }) => {
  const [description, setDescription] = useState(todo.description);
  if (!isVisible) return null;

  // edit description func

  const updateDescription = async (e) => {
    e.preventDefault();
    if (description === todo.description) {
      // No changes, close the modal
      onClose();
      return;
    }
    try {
      const body = { description };

      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <div className="bg-white text-black p-2 rounded gap-2 flex flex-col">
          <Input
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-3">
            <Button onClick={(e) => updateDescription(e) && onClose()}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onClose()}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
