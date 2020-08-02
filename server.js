
// tutorila express https://masteringjs.io/tutorials/express/json
// https://levelup.gitconnected.com/guide-to-the-express-response-object-files-and-json-1cb4c3d1a122
// https://dev.to/lenmorld/quick-rest-api-with-node-and-express-in-5-minutes-336j

// rest api with node js and express example dev.to

// https://stackoverflow.com/questions/59352958/import-json-file-in-node-jsexpress-and-export-to-index-jsxreact

// Express Server
const express = require('express')

const server = express();

const cons = require('consolidate');

const path = require("path")

let data = require('./public/data/data');  // json data file - export module

const publicDirectoryPath = path.join( __dirname, "./public");

server.use(express.static( publicDirectoryPath ));

// view engine setup
server.engine('html', cons.swig)
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');

server.use(express.json()); 

// var test_data = '{"storyId": "12345", "test":[{ "testcase" : "10000", "description" :"Bulk QuoteCreate"},{"testcase" : "20000", "description" :"Discount on Renewal"}]}';

server.get('/',(req, res) => {
  res.render('index');
})

// read all endpoint
server.get('/api/tests',(req, res) => {
  // var json = JSON.parse(test_data)
  // console.log(test_data.test[0].testcase)

 res.setHeader('Content-Type', 'application/json');
 json = JSON.stringify(data, null, 3);  // prettify json data array 
 //console.log(data[0].test[0].testcase)  // prints test case id
  res.send(json);
})

// read one endpoint
server.get('/api/tests/:id',(req, res) => {
  const itemId = req.params.id;

  const item = data.find(_item => _item.storyId === itemId);

  if (item) {
     res.json(item.test);
  } else {
     res.json({ message: `item ${itemId} doesn't exist`})
  }
})


server.listen(3000, () => {
  console.log('Server is up an running on port 3000');
})

