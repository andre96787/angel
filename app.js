var express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '1',
    database : 'mylife'
});


var path = require("path");
var bodyParser = require("body-parser");


var multer  = require('multer');

const cors = require('cors');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
   callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.png');
  }
});

 



var app = express();

app.use(session({secret: 'my-secret'}));
var sessions;


app.use('/public', express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));






app.use(cors());





app.post('/emailanalis',function(req,res){




pool.getConnection(function(err, connection) {
  if(err) {
    console.log(err);
  }
  let sql = "SELECT (Email) FROM user WHERE Email= ? ";
  connection.query(sql, [req.body.email], function(err, results) {
    connection.release(); // always put connection back in pool after last query
  
  res.send(results)
    if(err) {
      console.log(err);
    }
  });
});
});

 













app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})
