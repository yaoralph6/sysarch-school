var express = require("express");
var config = require("../config");
var router = express.Router();
var mysql = require("mysql");

var db=mysql.createPool(config.db);


router.get("/", function(req, res){
    var sql="select * from `students`";
    db.query(sql, function(err, results, fields){
        if (err) res.status(500).json(err);
        res.json({'students':results});
    });
});

router.post("/", function(req, res){
    var student=req.body;
    var sql="insert into `students`(`idno`, `lastName`,`firstName`,`course`,`level`) VALUES('"+student.idno+"','"+student.lastName+"','"+student.firstName+"','"+student.course+"','"+student.level+"')";
    db.query(sql, function(err, results, fields){
        if (err) res.status(500).json(err);
        res.json({ "message" : "New Student Added" })
    });

});

router.delete  ("/:idno", function(req, res){
    var idno=req.params.idno;
    var sql="delete from `students` where `idno`='"+idno+"'";
    db.query(sql, function(err, results, fields){
        if (err) res.status(500).json(err);
        res.json({ "message" : "Student Deleted" })
    });
});

router.put("/", function(req, res){
    var student=req.body;
    sql = "update `students` set `lastName`='"+student.lastName+"', `firstName`='"+student.firstName+"', `course`='"+student.course+"', `level`='"+student.level+"' where `idno`='"+student.idno+"'";
    db.query(sql, function(err, results, fields){
        if (err) res.status(500).json(err);
        res.json({ "message" : "Student Updated" })
    });
});

module.exports=router