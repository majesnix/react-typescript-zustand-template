import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { useStore } from "./dataLayer/useStore";

it("renders init text", async () => {
  useStore.setState({ examples: [{ id: "1", header: "init" }] });

  const { getByText } = render(<App />);
  await waitFor(() => getByText(/init/));
  expect(getByText(/init/)).toBeInTheDocument();
});
