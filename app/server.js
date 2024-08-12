import dotenv from 'dotenv';
import express from 'express';

const app = express();
dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* app.get('/', (req, res) => {
  res.status(200).send('Hello world');
}); */

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
