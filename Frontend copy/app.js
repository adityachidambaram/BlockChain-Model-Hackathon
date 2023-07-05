const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use(express.static('public'));

//app.get("/",require('./routes/voting'));

app.use(session({
    secret: 'hackathon',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post("/vote", async (req, res) => {
    const response = req.session.user +" "+req.body.vote
    try
    {
        await axios.put('http://localhost:9090',{response: response});
    }catch(error) {
        console.log("Can't connect to backend: " + error);
    }
    res.redirect('/');
});

app.get("/", async (req, res) => {
    const votes = await axios.get('http://localhost:9090');
    req.session.user = "10014556"
    res.render('start',{user: req.session.user});
});


app.listen(8080, () => {
    console.log(`App listening on port 8080`)
});
