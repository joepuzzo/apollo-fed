const { ApolloServer } = require("apollo-server-express");
const {
  ApolloGateway,
  RemoteGraphQLDataSource,
  LocalGraphQLDataSource
} = require("@apollo/gateway");
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const schema = require("./localSchema");

const PORT = 4000;

// Create Express application
const app = express();

// Apply CORS to the endpoints
app.use(cors({}));

// Add body parser
app.use(bodyParser.json());

// Add health endpoint for testing
app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});

const server = new ApolloServer({
  gateway: new ApolloGateway({
    serviceList: [
      { name: "local", url: "local" }, // << Dummy to force load of local schema :)
      { name: "dogs", url: "http://localhost:8001/graphql" },
      { name: "polls", url: "http://localhost:8000/graphql" }
    ],
    buildService({ name, url }) {
      // This will load a local schema!!!
      if (name === "local") {
        return new LocalGraphQLDataSource(schema);
      }
      return new RemoteGraphQLDataSource({ url });
    }
  }),
  subscriptions: false
});

server.applyMiddleware({ app, path: "/graphql", cors: {} });

/* ---------- Create the http server ---------- */

http.createServer(app).listen(PORT, () => {
  console.log("Http server is now running on port", PORT);
});

/** ---------- Example Polling Gateway ----------
 *
 * The gateway, by default, will not stay up to date with all
 * the external scheams. In order to stay up to date, you have
 * two choices.
 * 1. You add gateway.startPollingServices() to constantly poll for echema changes
 * 2. You set up federation manager
 *
 * Below is an example of a setup file
 */

// // Async function to create a gateway
// const createGateway = async () => {
//   const gateway = new ApolloGateway({
//     serviceList: [{ name: 'pricemaster', url: process.env.PRICE_MASTER_GRAPHQL_HOST }],
//   });
//   const { schema, executor } = await gateway.load();
//   // The below line is the key to keeping things up to date!!
//   gateway.startPollingServices();
//   return {
//     schema,
//     executor,
//   };
// };
// // Create the server with the results from create gateway
// const server = new ApolloServer({
//   schema,
//   executor,
// });
