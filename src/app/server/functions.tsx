"use server";

import { items } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from 'drizzle-orm';


export async function addItem(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  await db.insert(items).values({ name });

}

export async function getItems() {
  const allItems = await db.select().from(items);
  return allItems;
}

export async function getItemById(id: number) {
  const item = await db.select().from(items).where(eq(items.id, id)).get();
  return item;
}

export async function editItem(id: string, formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  await db.update(items).set({ name }).where(eq(items.id, parseInt(id))).run();
}

export async function deleteItem(id: string) {
  await db.delete(items).where(eq(items.id, parseInt(id))).run();
}

export async function editItemGathered(id: number, gathered: boolean) {
  await db.update(items).set({ gathered }).where(eq(items.id, id)).run();
}