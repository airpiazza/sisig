"use client";

import { Item } from "@/db/schema";
import { useCallback, useEffect } from "react";
import { getItems, editItemGathered } from "../server/functions";
import ItemRow from "../components/ItemRow";

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

  const handleGatheredChange = useCallback((itemId: Item["id"], gathered: boolean) => {
    setItemsList((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, gathered } : i))
    );
    
    editItemGathered(itemId, gathered).catch(() => {
      setItemsList((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, gathered: !gathered } : i))
      );
    });
  }, [setItemsList]);

  return <>
    <a href="/items/add">Add Item</a>
    {itemsList.map((item) => (
      <ItemRow key={item.id} item={item} onGatheredChange={handleGatheredChange} />
    ))}
      </>;
};
