const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const router = require('./routes/router.js');

app.use(express.json());

//mongodb connection
mongoose.connect(process.env.mongodatabase, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('Failed to connect to MongoDB', err));


// routes
app.use(router);


// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
