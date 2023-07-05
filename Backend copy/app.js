const express = require('express');
const bodyParser = require('body-parser');
const Block = require('./Block');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const votes = new Block.Blockchain();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/",(req, res) => {
    const totalVotes = votes.getTotalVotes();
   res.send({Inban:totalVotes[0],Kushaal:totalVotes[2],Chiddy:totalVotes[1]});
});

app.put("/",(req, res) => {
    const response = req.body.response;
    const myArray = response.split(" ");
    console.log(myArray[0] + " voted for " + myArray[1]);
    votes.addBlock(new Block.Block(myArray[0] + "votes for" + myArray[1]));
    votes.addTotalVotes(myArray[1]);
    console.log(votes.getTotalVotes());
    res.json({});
});

app.listen(9090, () => {
    console.log(`App listening on port 9090`)
});