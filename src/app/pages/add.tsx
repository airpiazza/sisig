export default function Add() {
  return (
    <form action="/add" method="post">
      <input type="text" name="item" />
      <button type="submit">Add</button>
    </form>
  );
}