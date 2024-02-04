const express = require('express');
const json2csv = require('json2csv');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // Replace with your desired port

// Declare the global data variable
var data = '';

mongoose.connect('mongodb://127.0.0.1:27017/union')
  .then(() => {
    console.log('MongoDB connected');

    var collection = mongoose.connection.collection('data');


  //  collection.find({}).toArray()
  //     .then((response) => {
  //      var data = response; // Assign the result to the global data variable
  //     //  let par= JSON.parse(data)
  //       console.log(response);
  //     })  
  //     .catch((error) => {
  //       console.error('Error retrieving data:', error);
  //     })
      // const another = mongoose.connection.collection('data');
      // another.find({}).toArray().then((response)=>{
      //   console.log(response)
      // })

 

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const fetch = async () => {
    try {
      const collection = mongoose.connection.collection('data');
      const local = await collection.find({})
      console.log(local);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
   
    }
  };
  
  fetch();
  
  
  


  

 


// Define a route to handle the download
app.get('/download', (req, res) => {
  collection.find({}).toArray()
  .then((response) => {
    const fields = Object.keys(response[0]); // Extract field names from the first object
    const csv = json2csv.parse(response, { fields });

    // Save the CSV data to a file and send it in the response
    fs.writeFile('mongo.csv', csv, (error) => {
      if (error) {
        console.error('Error writing to file:', error);
      } else {
        console.log('File is created');

        // Send the CSV file as an attachment in the response
        res.attachment('mongo.csv').set('Content-Type', 'text/csv').send(csv);
      }
    });
  })
  .catch((error) => {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data.');
  });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
