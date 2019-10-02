const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/v1/items', require('./routes/items'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
