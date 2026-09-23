"use server";

import { items } from "@/db/schema";
import { db } from "@/db/db";


export async function addTodo(formData: FormData) {
  const item = formData.get("item")?.toString() || "";
  await db.insert(items).values({ item });

}