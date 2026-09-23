import { addTodo } from "./functions";

export default function Add() {
  return (
    <form action={addTodo}>
      <input type="text" name="item" />
      <button type="submit">Add</button>
    </form>
  );
}