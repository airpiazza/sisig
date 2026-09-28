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

export async function updateItem(id: number, gathered: boolean) {
  await db.update(items).set({ gathered }).where(eq(items.id, id)).run();
}