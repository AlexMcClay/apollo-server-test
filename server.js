import express from "express";
import { createServer } from "http";

// Apollo
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

// middleware
import cors from "cors";
import { json } from "body-parser";

// websocket
import WebSocket, { WebSocketServer } from "ws";

// schema
import { resolvers, typeDefs } from "./graphql";

(async function () {
  // server code
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // ws Server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  // Apollo server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // start server
  await server.start();

  // apply middleware
  app.use("/graphql", cors(), json, expressMiddleware(server));

  // http server start
  httpServer.listen(4000, () => {
    console.log("Server Running on port 4000");
  });
})();
