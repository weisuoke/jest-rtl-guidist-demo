import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MSWForm from "../MSWForm";

// TODO 优化，移动到 jest.setup.js
import { server } from "../../../mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("LoginForm", () => {
  it("should allow a user to log in", async () => {
    render(<MSWForm />);

    await userEvent.type(screen.getByLabelText(/username/i), "johnUser");

    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText("f79e82e8-c34a-4dc7-a49e-9fadc0979fda")
    ).toBeInTheDocument();
    expect(await screen.findByText("John")).toBeInTheDocument();
    expect(await screen.findByText("Maverick")).toBeInTheDocument();
  });
});
