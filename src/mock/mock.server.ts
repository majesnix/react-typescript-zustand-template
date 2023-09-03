import { Model, Registry, RestSerializer } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
import { createServer } from "miragejs";
import { Example } from "../dataLayer/ExampleSlice";

const ExampleModel: ModelDefinition<Example> = Model.extend({});

export type AppRegistry = Registry<
  {
    example: typeof ExampleModel;
  },
  {}
>;

export type AppSchema = Schema<AppRegistry>;

export const makeServer = (environment: string = "development") => {
  const ApplicationSerializer = RestSerializer.extend({
    root: false,
    embed: true,
  });

  const server = createServer({
    environment,
    serializers: {
      application: ApplicationSerializer,
    },
    factories: {},
    models: {
      example: ExampleModel,
    },
    seeds(server) {
      //@ts-ignore
      if (!window.Cypress) {
        server.create("example", { id: "1", header: "init" });
      }
    },
    routes() {
      this.get("/examples", (schema: AppSchema, req: any) => {
        return [
          schema.findBy("example", {
            id: "1",
          }),
        ];
      });
    },
  });

  return server;
};
