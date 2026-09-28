export default function Add() {
  return (
    <>
    <a href="/items">Back</a>
    <form action="/items/add" method="post">
      <input autoFocus type="text" name="name" />
      <button type="submit">Add</button>
    </form>
    </>
  );
}