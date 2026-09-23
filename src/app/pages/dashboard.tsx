// src/app/pages/dashboard.tsx

import { db } from "@/db/db";
import { items, type Item } from "@/db/schema";

export const Dashboard = async ({ ctx }: { ctx: any }) => {
  const allItems: Item[] = await db.select().from(items);
}