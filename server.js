// const fileUpload = require('express-fileupload');
var resumePdfToJson = require('resume-pdf-to-json');
var multer  = require('multer');
var upload = multer({ dest: 'data/' });
var express = require('express'), config = require('./config'), app = express();
// const pug = require('pug');
// let fs = require('fs'),
//         PDFParser = require("pdf2json");
//const compiledFunction = pug.compileFile('template.pug');



app.use(express.static(__dirname + '/static'));
// app.set('view engine', 'pug');
// app.engine('pug', require('pug').__express);
// app.use(fileUpload());

// app.post('/upload', function(req, res) {
// 	console.log(req);
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
//
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('data/sampleFile.pdf', function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!');
//   });
// });

//function that convert resume linkedin PDF to Json object
// function use(path,{'output': output}){
//     return resumePdfToJson(path, {'output': output})
//     .then(function(data){
//       return{
//         'resume':data,
//       };
//     });
// }




app.post('/upload', upload.single('sampleFile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
var path = 'data/'+req.file.filename;
console.log(path);
var output = 'data/'+req.file.filename+'.json';

resumePdfToJson(path , {'output' : output})
  .then(function(data){
    console.log(data);
    // res.send(data)
    // res.sendFile(__dirname + config.slidepath);
    // pug.renderFile('index.pug');
      // res.render(__dirname + "/html/test.html");
      res.render('index.jade');
  });
});
//
app.get('/', function (req, res) {
  res.send('Hello World');
});
//
app.get('/upload', function(req, res) {
	// je dois ajouter ici le path
	res.sendFile(__dirname + config.uploadfile);
});

app.get('/', function(req, res) {
	// je dois ajouter ici le path
	res.sendFile(__dirname + config.slidepath);
});



app.listen(config.server_port);
console.log(config.server_port);

module.exports = app;
