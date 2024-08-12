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

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
