const express = require("express");
const cors = require("cors");

const server = express();

const weatherCalc = require("./data/weather-calc-router");

server.use(cors());
server.use(express.json());

server.use("/", weatherCalc);

module.exports = server;
