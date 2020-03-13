const { ApolloServer } = require("apollo-server-express");
const { ApolloGateway } = require("@apollo/gateway");
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

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
      { name: "dogs", url: "http://localhost:8001/graphql" },
      { name: "polls", url: "http://localhost:8000/graphql" },
    ]
  }),
  subscriptions: false
});

server.applyMiddleware({ app, path: "/graphql", cors: {} });

/* ---------- Create the http server ---------- */

http.createServer(app).listen(PORT, () => {
  console.log("Http server is now running on port", PORT);
});
