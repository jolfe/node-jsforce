const express = require("express");
const jsforce = require("jsforce");
const app = express();
const PORT = 3001;
require("dotenv").config();

const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;
const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL,
});

conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    console.log(err);
  } else {
    console.log(userInfo.id);
    console.log(userInfo.organizationId);
  }
});

app.get("/", (req, res) => {
  conn.query("SELECT Id, Name FROM Account", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result.records);
      console.log(result);
    }
  });
});

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
