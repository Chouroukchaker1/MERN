const express = require('express');
const database = require('./src/database/db.config');
require('dotenv').config();
const app = express();
const cors=require('cors');
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.mongoose.connect(database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Database connection error:', err);
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});


require('./src/api/routes/routes')(app);

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});