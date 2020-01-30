const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const postRoutes = require("./routes/api/posts");
const Post = require("./models/post");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Adding new mongo url parser
  .then(() => {
    //check if db is empty then we init with dummy data
    mongoose.connection.db
      .listCollections({ name: "posts" })
      .next(function(err, collinfo) {
        if (err) throw err;

        if (!collinfo) {
          fs.readFile("posts.json", "utf8", function(err, data) {
            let postData = JSON.parse(data).map(post => {
              post.imgId = Math.floor(Math.random() * 500);
              return post;
            });
            Post.insertMany(postData);
          });
        }
      });
    console.log("MongoDB Connected...");
  })
  .catch(err => console.log(err));

// Use Routes
app.use("/api/posts", postRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
