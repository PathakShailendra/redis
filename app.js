const express = require("express");
const axios = require("axios");
const app = express();
const Redis = require("ioredis");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// :
//

const redis = new Redis({
  host: "redis-12390.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 12390,
  password: "TKVa098Rctr5pPm7FolmI9RUDKzfda33",
});

redis.on("connect", () => {
  console.log("Connected to Redis...");
});

app.get("/create-ride", async (req, res) => {

  const isDataCached = await redis.get("indraPuri&MP");

  if(isDataCached) {
    return res.send(isDataCached)
  }
  const result = await axios.get("http://localhost:3001/distance");
  const data = result.data

  redis.set('indrapuri&MP', JSON.stringify(data));
  res.send(data);

});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
