const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const collections = require('./routes/collections');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/collections', collections);
app.use('/api/collections/:id/cards', collections);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
