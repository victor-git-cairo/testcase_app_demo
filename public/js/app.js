console.log("app.js solution");

const searchAll = document.querySelectorAll("button")[0];

const searchByID = document.querySelectorAll("button")[1];

console.log(searchByID);

var itemIDfield = document.getElementById("itemID");

var table = document.getElementById("dup_tests_table");

testDetail = [];

// get all items
searchAll.addEventListener("click", (e) => {
  e.preventDefault();

  // https://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html
  // https://www.youtube.com/watch?v=AOfSuajwY-I - JSON data to HTML Table using Ajax Jquery getJSON method
  // https://stackoverflow.com/questions/1290131/how-to-create-an-array-of-object-literals-in-a-loop

  fetch("/api/tests")
    .then((response) => response.json())
    .then((data) => {
      let test_data = "";

      // {"storyId": "12345", "test":[{ "testcase" : "300", "description" :"Bulk300 QuoteCreate"},{"testcase" : "10000", "description" :"Discount on Renewal"}]},
      Object.keys(data).forEach((key) => {
        var return_test = data[key].test.length; // test length

        // console.log("Test Cases Returned:" + return_test);
        if (return_test > 0) {
          testDetail = data[key].test.map((obj) => ({
            testId: obj.testcase,
            description: obj.description,
          }));

          //  Add duplicated test details in the table

          // var testIdCell = newRow.insertCell(0);   // Test Id index cell - index 0
          // var testDescriptionCell = newRow.insertCell(1);  // Test Description index cell - index 1

          for (var j = 0; j <= return_test - 1; j++) {
            console.log("testasasa" + j);
            var newRow = table.insertRow();

            var testIdCell = newRow.insertCell(0); // Test Id index cell - index 0
            var testIdDetail = document.createTextNode(testDetail[j].testId);
            testIdCell.appendChild(testIdDetail);

            var testDescriptionCell = newRow.insertCell(1); // Test Description index cell - index 1
            var testDescriptionDetail = document.createTextNode(
              testDetail[j].description
            );
            testDescriptionCell.appendChild(testDescriptionDetail); // Append value/test case detail to cell
          }
        }

        // console.log(k + ' - ' + a)

        // console.log(testDetail);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get items by id
searchByID.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("/api/tests/" + "12345");
  console.log(itemIDfield.value)

  // /api/tests/:id
  fetch("/api/tests/" + itemIDfield.value)
    .then((response) => response.json())
    .then((data) => {
      let test_data = "";
      console.log(data);

      if (!("message" in data)) {

        Object.keys(data).forEach((key) => {
          // key = 0, 1, - objects index
          console.log(data[key].testcase);
          console.log(data[key].description);

          testDetail = data.map((obj) => ({
            testId: obj.testcase,
            description: obj.description,
          }));

          console.log(testDetail);

          //  Add duplicated test details in the table

          for (var j = 0; j <= data.length - 1; j++) {
            console.log("testasasa" + j);
            var newRow = table.insertRow();

            var testIdCell = newRow.insertCell(0); // Test Id index cell - index 0
            var testIdDetail = document.createTextNode(testDetail[j].testId);
            testIdCell.appendChild(testIdDetail);

            var testDescriptionCell = newRow.insertCell(1); // Test Description index cell - index 1
            var testDescriptionDetail = document.createTextNode(
              testDetail[j].description
            );
            testDescriptionCell.appendChild(testDescriptionDetail); // Append value/test case detail to cell
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
