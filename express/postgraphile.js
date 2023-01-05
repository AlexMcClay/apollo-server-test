const express = require("express");
const { postgraphile, makePluginHook } = require("postgraphile");
const { default: PgPubsub } = require("@graphile/pg-pubsub");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const pluginHook = makePluginHook([PgPubsub]);

const postgraphileOptions = {
  pluginHook,
  subscriptions: true,
  simpleSubscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  live: true,
  ownerConnectionString:
    "postgresql://postgres:11331010369@localhost:5432/test",
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [
    require("@graphile-contrib/pg-simplify-inflector"),
    require("@graphile/subscriptions-lds").default,
  ],
  exportGqlSchemaPath: "./graphql/schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  websocketMiddlewares: [
    // Add whatever middlewares you need here, note that they should only
    // manipulate properties on req/res, they must not sent response data. e.g.:
    //
    //   require('express-session')(),
    //   require('passport').initialize(),
    //   require('passport').session(),
  ],
  pgSettings(req) {
    /* TODO */
  },
};

app.use(
  postgraphile(
    "postgresql://postgres:11331010369@localhost:5432/test",
    "public",
    postgraphileOptions
  )
);

app.listen(5000, () => {
  console.log("App is Listening on port 5000");
});
