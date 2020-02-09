const express = require("express");
const bodyParser = require("body-parser");
const students = require("./studentDetail");
const studentsRouter = require("./Router/studentrouter");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   // res.send("Response from Middleware");
//   req.customKey = "Value set in the middleware";
//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/student/:id", (req, res) => {
  const { id = "" } = req.params;
  const requireStudent = students.find(student => {
    if (parseInt(id) === student.id) return true;
    else return false;
  });
  res.status(200).json({ student: requireStudent });
});

app.get("/students", (req, res) => {
  /**
   * Express is smart enough to figure out the
   * response header's MIME type
   */
  // res.send(students);
  // res.send("<h1>Hello</h1>")

  /**
   * Multiple properties of the same object of the express modules
   * can be chained together
   */
  // res.status(200);
  // res.json({students}); // These two statements can be chained together

  /**
   * It's a good practice to be explicit
   * of the status codes and response types
   */
  res.status(200).json({ students });
});

app.post("/students", (req, res) => {
  if (req.body.id && req.body.firstName) {
    students.push(req.body);
    res.status(200).json({ message: " Student Created Sucessfully" });
  } else {
    res.status(400).send("Bad Request");
  }
  res.send("Post method called");
});

const server = app.listen(9000, () => {
  console.log(`Server running in port ${server.address().port}`);
});
