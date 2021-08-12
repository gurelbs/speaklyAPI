const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const router = require('./routes/router');
const { json } = require('express');
const cors = require('cors')
const app = express();

app.use(json());
app.use(cors());
app.use('/api',router);



if (process.env.NODE_ENV === 'production'){
  app.get('*', (req, res) => {
      res.sendFile('index.html',{root: './dist'});
  });
}

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`server run at http://localhost:${port}`))