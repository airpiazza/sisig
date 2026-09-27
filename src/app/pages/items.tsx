"use client";

import { Item, items } from "@/db/schema";
import { useEffect } from "react";
import { getItems, updateItem } from "./functions";

import { useSyncedState } from "rwsdk/use-synced-state/client";

export default function Items() {
  const [itemsList, setItemsList] = useSyncedState<Item[]>([], "itemsList");

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
        <input id={`${item.id}`} checked={item.gathered ?? false} type="checkbox" onChange={(e) => {
          const updatedItems = itemsList.map((i) => {
            if (i.id === item.id) {
              updateItem(i.id, e.target.checked);
              return { ...i, gathered: e.target.checked };
            }
            return i;
          });
          setItemsList(updatedItems);

        }} />
        <label htmlFor={`${item.id}`}>
          {item.name}
        </label>
      </div>
    ))}
      </>;
};
