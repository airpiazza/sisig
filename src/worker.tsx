import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import Add from "./app/pages/add";
import { addItem } from "./app/server/functions";
import Items from "./app/pages/items";

import { env } from "cloudflare:workers";
import {
  SyncedStateServer,
  syncedStateRoutes,
} from "rwsdk/use-synced-state/worker";

export { SyncedStateServer };

export type AppContext = {};

export interface Env {
  items: D1Database;
}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    route("/items", Items),
    route("/add", {
      get: () => <Add />,
      post: async ({ request }) => {
        const formData = await request.formData();
        await addItem(formData);
        return new Response(null, { status: 302, headers: { Location: "/items" } });
      }
    })
  ]),
  ...syncedStateRoutes(() => env.SYNCED_STATE_SERVER),
]);