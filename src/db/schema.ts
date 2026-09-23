// src/db/schema.ts

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

export const items = sqliteTable('items', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  item: text('item').notNull(),
  gathered: integer({ mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull().default(sql`(datetime('now', 'localtime'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now', 'localtime'))`),
});

export type Item = typeof items.$inferSelect;
export type ItemInsert = typeof items.$inferInsert;