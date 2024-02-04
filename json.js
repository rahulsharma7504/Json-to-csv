const csvtojson = require('csvtojson');
const fs = require('fs');
let path=require('path')


// Specify the path to your CSV file
const csvFilePath = path.join(__dirname,"output.csv")

// Create a csvtojson converter
const csvConverter = csvtojson();

// Convert CSV to JSON  
csvConverter
  .fromFile(csvFilePath)
  .then((jsonData) => {
    // Write the JSON data to a file
    fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('JSON file has been created');
  })
  .catch((err) => console.error(err));
