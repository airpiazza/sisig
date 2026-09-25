"use client";

import { Item } from "@/db/schema";
import { useEffect, useState } from "react";
import { getItems } from "./functions";

export default function Home() {
  const [itemsList, setItemsList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allUsers: Item[] = await getItems();
      setItemsList(allUsers);
    };

    fetchData();
  }, []);

  return <>
    <a href="/add">Add Item</a>
    {itemsList.map((item) => (
      <div key={item.id}>
        <input id={`item-${item.id}`} name={item.name} type="checkbox" value={item.name} />
        <label htmlFor={`item-${item.id}`}>
          {item.name}
        </label>
      </div>
    ))}
      </>;
};
