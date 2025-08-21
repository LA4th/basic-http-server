import express from "express";

const app = express();
const port = 3000;
const host = `http://localhost:${port}/`;
let notes = [];

// MIDDLE WARE FOR CREATE SERVER
app.use(expree.json());

// GET DATA
app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});
// POST DATA
app.post("/notes", (req, res) => {

});