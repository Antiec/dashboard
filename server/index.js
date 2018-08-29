const http = require("http");
const app = require("express")();
const knex = require("knex")({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./assignment.sqlite"
  }
});

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world! Try the /app route for a list of appIDs.");
});

app.get("/app", (req, res) => {
  knex("assignment")
    .select("appID")
    .groupBy("appID")
    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/app/allAvgSent/avg", (req, res) => {
  knex("assignment")
    .select("appID", knex.raw("AVG(meanSendingRateKbps) as avg"))
    .groupBy("appID")
    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/app/:appID", (req, res) => {
  knex("assignment")
    .select()
    .where({ appID: req.params.appID })
    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/app/:appID/avg", (req, res) => {
  knex("assignment")
    .select("meanSendingRateKbps as avg")
    .where({ appID: req.params.appID })

    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/app/:appID/:field", (req, res) => {
  knex("assignment")
    .select(req.params.field)
    .where({ appID: req.params.appID })

    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/fields", (req, res) => {
  knex("assignment")
    .columnInfo()
    .then(fields => res.json(Object.keys(fields)))
    .catch(err => res.status(500).send(err));
});

app.get("/build", (req, res) => {
  knex("assignment")
    .select("buildName")
    .groupBy("buildName")
    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/build/:name", (req, res) => {
  knex("assignment")
    .select("buildVer")
    .groupBy("buildVer")
    .where({ buildName: req.params.name })
    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/build/:name/:version", (req, res) => {
  knex("assignment")
    .select("meanSendingRateKbps as avg")
    .where({ buildName: req.params.name, buildVer: req.params.version })

    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

app.get("/media/:appid", (req, res) => {
  knex("assignment")
    .select("mediaType", knex.raw("count(mediaType) as count"))
    .groupBy("mediaType")
    .where({ appID: req.params.appid })
    .then(values => res.json(values))
    .catch(err => res.status(500).send(err));
});

console.log("App listening on http://localhost:8081");
app.listen(8081);
