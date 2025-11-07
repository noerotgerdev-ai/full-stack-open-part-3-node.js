const express = require("express");
const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(morgan('tiny'))

let list = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Node.js APP</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(list);
});

app.get("/info", (req, res) => {
  const contacts = list.length;
  const date = new Date();
  const message = `
    <p>Phonebook has info for ${contacts} people</p>
    <p>${date}</p>
    `;

  res.send(message);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const contact = list.find((item) => item.id === id);

  if (!contact)
    return res.status(404).send(`The person with id ${id} is not found.`);
  res.send(contact);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = list.find((item) => item.id === id);
  if (!person)
    return res.status(404).send(`The person with id ${id} is not found.`);

  list = list.filter((item) => item.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const id = Math.round(Math.random() * 100000);

  if (!req.body.name)
    return res.status(400).send({ error: "name is required" });
  if (!req.body.number)
    return res.status(400).send({ error: "number is required" });

  const checkName = list.find((item) => item.name === req.body.name);

  if (checkName) return res.status(400).send({ error: "name must be unique" });

  const contact = {
    id,
    name: req.body.name,
    number: req.body.number,
  };

  list = [...list, contact];
  res.send(contact);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App running in http://localhost:${PORT}`);
});
