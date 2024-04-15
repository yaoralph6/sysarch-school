var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");
var config = require("./config");
var student = require("./API/studentAPI");
var mysql = require("mysql");

var app = express();

var db=mysql.createPool(config.db);

app.use(bodyparser.urlencoded({"extended":true}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Login route
// Login route
app.post("/login", function(req, res) {
    var { email, password } = req.body;
    
    // Check if user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            return res.status(500).send({ message: "Error retrieving user." });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: "User not found." });
        }

        var user = results[0];
        
        // Compare passwords
        if (password !== user.password) {
            return res.status(401).send({ message: "Invalid password." });
        }

        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    });
});


app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use("/students", student);

app.get("/", function(req, res) {
    res.send("SCHOOL101 RESTFUL API USING MYSQL DATABASE");
});

var server = app.listen(config.port, function() {
    require("dns").lookup(require("os").hostname(), function(err, addr, fam) {
        console.log("Server running at https://%s:%s", addr, config.port);
    });
});
