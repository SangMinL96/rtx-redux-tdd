import { rest } from "msw";
import { createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { requestAPI } from "@/modules/request/query";

// We're just going to use a simple in-memory store for both the counter and posts
// The entity adapter will handle modifications when triggered by the MSW handlers

const Request = requestAPI;

const adapter = createEntityAdapter<Request>();
let state = adapter.getInitialState();
state = adapter.setAll(state, []);

export { state };

// Just use a random id for an auth token
const token = nanoid();

export const handlers = [
  rest.get(
    "http://127.0.0.1:4444/api/v1/cscenter/myRequestList?sort=reg_date",
    (req, res, ctx) => {
      console.log(res);
      return res(
        ctx.json([]),
        ctx.delay(400)
      );
    }
  ),
  //   rest.post("/login", (req, res, ctx) => {
  //     return res(
  //       ctx.json({ token, user: { first_name: "Test", last_name: "User" } })
  //     );
  //   }),

//   rest.get("/posts", (req, res, ctx) => {
//     return res(ctx.json(Object.values(state.entities)));
//   }),
];
