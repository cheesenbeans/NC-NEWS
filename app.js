const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controllers");
const { getArticles, getArticleById, getCommentsByArticleId, patchArticleWithVotes} = require("./controllers/articles.controllers");
const { getApis } = require("./controllers/apis.controllers");
app.use(express.json())


app.get("/api/topics", getTopics);

app.get("/api", getApis);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.get("/api/articles", getArticles);

app.patch("/api/articles/:article_id", patchArticleWithVotes)

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Code 500 - server error!" });
});

module.exports = app;
