"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_tools_1 = require("graphql-tools");
const service_1 = require("./products/service");
const service_2 = require("./users/service");
const app = express_1.default();
const port = 3000;
let typeDefs = [
    `
  type Query {
    hello: String
  }

  type Mutation {
    hello(message: String) : String
  }
`
];
let helloMessage = "World!";
let resolvers = {
    Query: {
        hello: () => helloMessage
    },
    Mutation: {
        hello: (_, helloData) => {
            helloMessage = helloData.message;
            return helloMessage;
        }
    }
};
let productsService = new service_1.ProductsService();
let usersService = new service_2.UsersService();
typeDefs += productsService.configTypeDefs();
typeDefs += usersService.configTypeDefs();
productsService.configResolvers(resolvers);
usersService.configResolvers(resolvers);
app.use("/graphql", express_graphql_1.default({
    schema: graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));
app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));
