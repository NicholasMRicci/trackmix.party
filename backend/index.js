const express = require('express'); // load express
app = express();      // create instance

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))


app.get('/hello', (req, res) =>  // respond HTTP GET
    res.send('hello world'));      // "hello world"

app.listen(3000);