const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
var upload = multer();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.port || 80;
app.set('view engine', 'jade');
app.use(express.static('src/public'));
app.use(upload.array());

app.get("/", function(req, res) {
    res.render('index');
});

app.get("/app", function(req, res) {
    res.render('app');
});

app.post('/getResults', (req, res) => {
    let textResponses = req.body.textResponses;
    let data = "";
    res.send(JSON.stringify(textResponses));
});

app.listen(port, function() {
    console.log("Server has started running on port: " + port);
});