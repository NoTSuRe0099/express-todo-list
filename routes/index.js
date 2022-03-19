var express = require("express");
var router = express.Router();
const Todos = require("../public/DB/todos");
const fs = require("fs");

//? Create Todo Route
router.post("/create", (req, res, next) => {
    const newData = [...Todos, { ...req.body, id: Date.now() }];
    fs.writeFileSync("public/DB/todos.json", JSON.stringify(newData));
    res.status(201).redirect("/");
});

//? Read Todo/home page Route
router.get("/", function (req, res, next) {
    const data = fs.readFileSync("public/DB/todos.json", "utf8");
    res.render("index", { todos: JSON.parse(data), updation_data: "" });
});

//? get data of Updating Todo
router.get("/updateTodo/:data", (req, res, next) => {
    let updation_data = req.params.data;
    updation_data = Todos.filter((todo) => todo.id == updation_data);
    updation_data = updation_data[0];
    const data = fs.readFileSync("public/DB/todos.json", "utf8");
    res.status(201).render("index", {
        todos: JSON.parse(data),
        updation_data: updation_data,
    });
});

//? Update todo
router.post("/update", (req, res, next) => {
    const index = Todos.findIndex((todo) => todo.id == req.body.id);
    let newData = [...Todos];
    newData[index] = { ...req.body };
    fs.writeFileSync("public/DB/todos.json", JSON.stringify(newData));
    res.status(201).redirect("/");
});

//? Delete Todo Route
router.get("/deleteTodo/:id", (req, res, next) => {
    const id = req.params.id;
    const newData = Todos.filter((todo) => Number(todo.id) !== JSON.parse(id));
    fs.writeFileSync("public/DB/todos.json", JSON.stringify(newData));
    res.status(200).redirect("/");
});

module.exports = router;
