export default function Add() {
  return (
    <form action="/items/add" method="post">
      <input type="text" name="name" />
      <button type="submit">Add</button>
    </form>
  );
}