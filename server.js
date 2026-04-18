
// To create a server using express

const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

// initialize passport
app.use(passport.initialize());

//It is a middleware used in Node.js / Express.js apps.Its job is to read data sent by the client in the request body.
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;


// middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] requeat made to : ${req.originalUrl}`,);
  next(); //move on to next phase
};
app.use(logRequest);


const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Well Come to my hotel");
});


//Import the router files
const routerPerson = require("./routes/routerPerson");
const menuRouter = require("./routes/menuRouter");

//Use the routers
app.use("/person",  routerPerson);
app.use("/menuItem", menuRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

//hii server
