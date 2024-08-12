import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
