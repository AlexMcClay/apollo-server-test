const express = require("express");
const { postgraphile } = require("postgraphile");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "./graphql/schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  pgSettings(req) {
    /* TODO */
  },
};

app.use(
  postgraphile(
    "postgresql://postgres:11331010369@localhost:5432/prisma-graphql",
    "public",
    postgraphileOptions
  )
);

app.listen(5000, () => {
  console.log("App is Listening on port 5000");
});
