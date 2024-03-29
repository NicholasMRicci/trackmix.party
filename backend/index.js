const express = require('express'); // load express
const session = require('express-session'); // load express
app = express();      // create instance

app.use(session({
    proxy: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        secure: true
    }
}));


app.get('/hello', (req, res) =>  // respond HTTP GET
    res.send('hello world'));      // "hello world"

app.listen(3000);