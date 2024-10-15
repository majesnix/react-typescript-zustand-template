import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ExampleComponent } from "./components/ExampleComponent";

const router = createBrowserRouter([
  { path: "*", Component: ExampleComponent }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
