
// ---------> Demo - Not used 
// JSON Data Manipulation

// rest api with node js and express example

const { Server } = require("http")

// var text = '{ "employees" : [' +
// '{ "firstName":"John" , "lastName":"Doe" },' +
// '{ "firstName":"Anna" , "lastName":"Smith" },' +
// '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

// ------> Alternative to load without Server, did not work for me

// var myInit = {
//    method: 'GET',
//    headers: {
//      'Content-Type': 'application/json',
//      'Access-Control-Allow-Origin':'*',
//    },
//    mode: 'cors',
//    cache: 'default'
//    }

// let myRequest = new Request('../js/data.json', myInit);

// function to read json data from variable 
function readUsersJsonData() {
 var txt = '[{"name":"John", "age":30, "city":"New York"},' + 
 '{"name":"Anne", "age":25, "city":"Alabama"}]'
  var obj = JSON.parse(txt);
  console.log(obj[0].name)
  console.log(obj[1].name)
}


// function to load json data file -data.json
function readUsersJsonDataFile() {
  fetch('/http://example.com/movies.json')
       .then ((response) => response.json())      
       .then ((data) => console.log(data))
       .catch( err => {console.log(err)});
 }

//readUsersJsonData()
 readUsersJsonDataFile();
