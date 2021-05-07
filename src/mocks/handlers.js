import { rest, graphql } from "msw";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Response with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),

  rest.post("/login2", (req, res, ctx) => {
    const { username } = JSON.parse(req.body);

    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username,
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),

  graphql.mutation("Login", (req, res, ctx) => {
    const { username } = req.variables;

    if (username === "non-existing") {
      return res(
        ctx.errors([
          {
            message: "User not found",
            extensions: {
              id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
            },
          },
        ])
      );
    }

    return res(
      ctx.data({
        user: {
          __typename: "User",
          id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
          firstName: "John",
          lastName: "Maverick",
        },
      })
    );
  }),
];
