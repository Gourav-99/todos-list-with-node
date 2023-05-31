// file contains all the api crud operations
const express = require("express");
const router = express.Router();
const ls = require("local-storage");
const uuid = require("uuid");

router.get("/", (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const todos = ls.get("todos").filter((todo) => todo.userId === id);
    return res.status(200).json({
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/", (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const { title } = req.body;
    const todos = ls.get("todos");
    const newTodo = {
      id: uuid.v4(),
      title,
      isComplete: false,
      userId: id,
    };
    todos.push(newTodo);
    ls.set("todos", todos);
    return res.status(200).json({
      message: "Todo created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, isComplete } = req.body;
    const todos = ls.get("todos");
    const todo = todos.find((todo) => todo.id === id);
    todo.title = title || todo.title;
    todo.isComplete = isComplete !== undefined ? isComplete : todo.isComplete;

    ls.set("todos", todos);
    return res.status(200).json({
      message: "Todo Updated sucessfully",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    let todos = ls.get("todos");
    todos = todos.filter((todo) => todo.id !== id);
    ls.set("todos", todos);
    return res.status(200).json({
      message: "Todo Deleted sucessfully",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
