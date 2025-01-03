const express = require("express");
const app = express.Router();

const employees = require("../employees.js");

app.get("/", (req, res) => {
  res.json(employees);
});

app.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

app.post("/", (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    employees.push({ id: employees.length + 1, name });
    res.status(201).json(employees.at(-1));
  } else {
    next({ status: 400, message: "Name is not correctly provided." });
  }
});

module.exports = app;
