const express = require("express");
const students = require("../studentDetail");

const studentsRouter = express.Router();

studentsRouter
  .get("/", (req, res) => {
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
  })
  .post("/", (req, res) => {
    if (req.body.id && req.body.firstName) {
      students.push(req.body);
      res.status(200).json({ message: "Student created successfully" });
    } else {
      res.status(400).send("Bad Request");
    }
  });

module.exports = studentsRouter;
