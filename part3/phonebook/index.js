const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("tiny"));
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

let persons = [
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
    name: "Dan Abramov2",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generatePersonId = () => {
  return persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/info", (request, response) => {
  const time = new Date();
  response.send(
    `<p>Phone book has  info for ${persons.length} people</p><p>${time}</p>`
  );
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const singlePerson = persons.find((person) => person.id === id);
  if (singlePerson) {
    response.json(singlePerson);
  } else {
    response.status(400).json({
      error: "content missing",
    });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const { name, number } = body;

  if (!name || !number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  } else if (persons.find((person) => person.name === name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = { name: name, number: number, id: generatePersonId };
  persons = persons.concat(person);
  response.json(person);
  app.use(morgan("body"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
