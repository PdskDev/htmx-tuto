import dotenv from "dotenv";
import express from "express";

const app = express();
dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;

    console.log("query limit", limit);

    const getUserFromApi = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await getUserFromApi.json();

    res.status(200).send(`
    <h2>Users list</h2>
    <ul class="list-group">
        ${users
          .map(
            (user) =>
              `<li class="list-group-item">${user.name} - ${user.email}</li>`
          )
          .join("")}
    </ul>`);
  }, 2000);
});

app.post("/calculate-bmi", (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  const randomId = Math.floor(Math.random() * 100);

  if (height < 0 || height == 0) {
    res.status(200).send(
      `<p class='alert alert-danger' role='alert'>
        height must be greater than 0!
      </p>
      `
    );
  } else {
    const bmi = (weight / (height * height)).toFixed(2);

    res.status(200).send(
      `<p>#${randomId} Height of ${height} with weight of ${weight} gives your BMI of ${bmi}</p>
    `
    );
  }
});

app.post("/users-search", async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm) {
    return res.send(`
      <tr><td colspan='3' class='text-center'>No result</td></tr>
      `);
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersList = await response.json();

  const resultOfSearch = usersList.filter((user) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const email = user.email.toLowerCase();
    return (
      name.includes(searchTerm) ||
      username.includes(searchTerm) ||
      email.includes(searchTerm)
    );
  });

  const resultToHtml = resultOfSearch
    .map(
      (user) => `
       <tr>
         <td>${user.name}</td>
         <td>${user.username}</td>
         <td>${user.email}</td>
       </tr>
    `
    )
    .join("");

  res.status(200).send(resultToHtml);
});

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
