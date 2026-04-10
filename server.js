// function add(a,b){
//     return a+b;
// }

// const { json } = require("express");

// let result = add(5,10);

// console.log(result);

//npm init
// npm install nodemon

// callback function

// function callback(){
//     console.log("callback function called");
// }

// const add = (a,b,callback) => {
//     let result = a+b;
//     console.log("result: " +result); //main function complete hone ke baad callback function call hoga
//     callback();
// }

// add(5,10,callback);

//Another Way to call callback function

// const add = (a,b,callback) => {
//     let result = a+b;
//     console.log("result: " +result); //main function complete hone ke baad callback function call hoga
//     callback();
// }

// add(5,10, function() {
//     console.log("callback function called");
// })

// add(5,10, () => console.log("callback function called"));

//fs and os module

// var fs = require('fs');
// var os  = require('os');

// var user = os.userInfo();

// console.log(user);
// console.log(user.username);

// fs.appendFile('greet.txt', 'Hello '  + user.username + ' !\n', () => {
//     console.log('greet.txt file created');
// });

//importing our own FILE
// var  _ = require('lodash');
// const notes = require('./notes.js');
// console.log('server file is available');

// var age = notes.age;
// var sum = notes.addNumber(age+5,10);
// console.log('age: ' + age);
// console.log('sum: ' + sum);

// var data = ["Mahendra", "Virat", "Rohit", "Shikhar", "Hardik","Rohit", "Shikhar", "Hardik",1,1,2,2,2,3];

// var  filter=  _.uniq(data);
// console.log(filter);

//Convert JSON string to Object

// const jsonString = '{"name": "Mahendra Singh Dhoni", "age": 41, "profession": "Cricketer"}';
// const jsonParsed = JSON.parse(jsonString);
// console.log(jsonParsed);
// console.log(typeof jsonParsed);

//Convert object to JSON string

// const objectToConvert = {
//     name: "Mahendra Singh Dhoni",
//     age: 41,
//     profession: "Cricketer"
// }
// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(jsonStringified);
// console.log(typeof jsonStringified);

// To create a server using express

const express = require("express");
const app = express();
const db = require("./db");

//It is a middleware used in Node.js / Express.js apps.Its job is to read data sent by the client in the request body.
const bodyparser = require("body-parser");
app.use(bodyparser.json());

//Import the router files
const routerPerson = require("./routes/routerPerson");
const menuRouter = require("./routes/menuRouter");

//Use the routers
app.use("/person", routerPerson);
app.use("/menuItem", menuRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//hii server 