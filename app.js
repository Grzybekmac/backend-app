const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "abc", email: "abc@abc.pl" },
  { id: 2, name: "abcd", email: "abcd@abc.pl" },
  { id: 3, name: "abcde", email: "abcde@abc.pl" }
];

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).send("User with given ID was not found");

  res.send(user);
});

app.post("/api/users", (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(user);

  res.send(user);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).send("User with given ID was not found");

  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  user.name = req.body.name;
  user.email = body.email;

  users.push(user);

  res.send(user);
});

app.delete("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).send("User with given ID was not found");

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.email().required()
  };

  return Joi.validate(user, schema);
}

const port = process.env.app || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
