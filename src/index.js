
const express = require('express');

const app = express();
const port = process.env.PORT || 300;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/mdsayan/',require('./routes/index'))


app.listen(port);

console.log('Server on port 3000');