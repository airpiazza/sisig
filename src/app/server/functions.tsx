"use server";

import { items } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from 'drizzle-orm';
import { requestInfo } from "rwsdk/worker";

// Server functions are callable directly over RPC, so each one checks the session itself.
function requireSession() {
  if (!requestInfo.ctx.session?.userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
}


export async function addItem(formData: FormData) {
  requireSession();
  const name = formData.get("name")?.toString() || "";
  await db.insert(items).values({ name });

}

export async function getItems() {
  requireSession();
  const allItems = await db.select().from(items);
  return allItems;
}

export async function getItemById(id: number) {
  requireSession();
  const item = await db.select().from(items).where(eq(items.id, id)).get();
  return item;
}

export async function editItem(id: string, formData: FormData) {
  requireSession();
  const name = formData.get("name")?.toString() || "";
  await db.update(items).set({ name }).where(eq(items.id, parseInt(id))).run();
}

export async function deleteItem(id: string) {
  requireSession();
  await db.delete(items).where(eq(items.id, parseInt(id))).run();
}

export async function editItemGathered(id: number, gathered: boolean) {
  requireSession();
  await db.update(items).set({ gathered }).where(eq(items.id, id)).run();
}