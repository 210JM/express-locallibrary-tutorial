const express = require('express');
const app = express();
const usersRouter = require('./users.js');

app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/users/cool/');
});
