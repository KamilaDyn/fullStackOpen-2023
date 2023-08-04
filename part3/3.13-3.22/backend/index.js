const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("tiny"));
app.use(express.static("build"));
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
const Person = require("./models/mongo");

app.use(cors());

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
app.get("/info", (request, response, next) => {
  const time = new Date();
  Person.find({})
    .then((persons) => {
      response.send(
        `<p>Phone book has  info for ${persons.length} people</p><p>${time}</p>`
      );
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  const { name, number } = body;

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savePerson) => {
      response.json(savePerson);
    })
    .catch((error) => next(error));
  app.use(morgan("body"));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  const person = {
    name: name,
    number: number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatePerson) => {
      response.json(updatePerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id, please try again." });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT);
