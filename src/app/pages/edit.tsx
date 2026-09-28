import { getItemById } from "../server/functions";

export default async function Edit({ id }: { id: string }) {
  const item = await getItemById(parseInt(id));
  return (
    <>
      <form action={`/items/${id}/edit`} method="post">
        <input type="text" name="name" defaultValue={item?.name ?? ""} />
        <button type="submit">Save</button>
      </form>
      <form action={`/items/${id}/delete`} method="post">
        <button type="submit">Delete</button>
      </form>
    </>
  );
}
