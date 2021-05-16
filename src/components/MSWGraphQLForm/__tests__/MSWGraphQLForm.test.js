import React from "react";
import { ApolloProvider } from "@apollo/client";
import { render, fireEvent, screen } from "@testing-library/react";
import { client } from "../../../ApolloClient";
import MSWGraphQLForm from "../MSWGraphQLForm";

// TODO 优化，移动到 jest.setup.js
import { server } from "../../../mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("MSWGraphQLForm", () => {
  it("should allow user to log in", async () => {
    render(
      <ApolloProvider client={client}>
        <MSWGraphQLForm />
      </ApolloProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "johnUser" },
    });
    fireEvent.click(screen.getByText(/submit/i));

    const userId = await screen.findByTestId("userId");
    const firstName = await screen.findByTestId("firstName");
    const lastName = await screen.findByTestId("lastName");

    expect(userId).toHaveTextContent("f79e82e8-c34a-4dc7-a49e-9fadc0979fda");
    expect(firstName).toHaveTextContent("John");
    expect(lastName).toHaveTextContent("Maverick");
  });
});
