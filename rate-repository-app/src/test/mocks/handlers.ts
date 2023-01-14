import { graphql } from "msw";

import { repositoryData } from "./data";

export const handlers = [
  graphql.mutation("AuthenticateUser", (req, res, ctx) => {
    const { username } = req.variables;
    sessionStorage.setItem("is-authenticated", username);

    return res(
      ctx.data({
        login: {
          username,
        },
      })
    );
  }),

  graphql.query("GetRepositories", (_req, res, ctx) => {
    return res(ctx.data(repositoryData));
  }),
];
