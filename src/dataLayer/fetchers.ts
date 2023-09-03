import ky from "ky";
import { Example } from "./ExampleSlice";

const kyClient = ky.extend({
  prefixUrl: import.meta.env.REACT_APP_API_URL ?? "http://localhost:5173/",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");

        if (token != null) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export const getExamples = async () => {
  return kyClient.get("examples").json<Example[]>();
};
