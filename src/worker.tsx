import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { Dashboard } from "./app/pages/dashboard";
import Add from "./app/pages/add";

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
    route("/", Home),
    route("/add", Add),
    route("/dashboard", ({ ctx }) => Dashboard({ ctx }))
  ]),
]);
