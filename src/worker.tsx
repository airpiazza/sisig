import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import Add from "./app/pages/add";
import { addItem } from "./app/pages/functions";
import Home from "./app/pages/home";

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
    route("/items", Home),
    route("/add", {
      get: () => <Add />,
      post: async ({ request }) => {
        const formData = await request.formData();
        await addItem(formData);
        return new Response(null, { status: 302, headers: { Location: "/items" } });
      }
    })
  ]),
]);
