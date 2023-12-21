import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="mt-5">
      <h1 className="">InputTodo</h1>
      <form action="" onSubmit={onSubmit} className="flex">
        <Input
          type="text"
          value={description}
          className=""
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
};

export default InputTodo;
