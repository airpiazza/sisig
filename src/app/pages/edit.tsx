import { getItemById } from "../server/functions";

export default async function Edit({ id }: { id: string }) {
  const item = await getItemById(parseInt(id));
  return (
    <>
    <a href="/items">Back</a>
      <form action={`/items/${id}/edit`} method="post">
        <input autoFocus type="text" name="name" defaultValue={item?.name ?? ""} />
        <button type="submit">Save</button>
      </form>
      <form action={`/items/${id}/delete`} method="post">
        <button type="submit">Delete</button>
      </form>
    </>
  );
}
