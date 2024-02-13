import express from "express"
import fs from'fs';
import yaml from'js-yaml';


const app = express();
const dataHere = [];

app.get("/xml", (req, res) => {
    const filePath = '\my_files\\me.xml'

    // Read the XML file
    fs.readFile(filePath, 'utf-8', (err, xmlData) => {
        if (err) {
          console.error(`Error reading XML file: ${err.message}`);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        // Set the appropriate headers for XML
        res.header('Content-Type', 'application/xml');
        res.status(200).send(xmlData);
      });

});




app.get('/yaml', (req, res) => {
  // Read the YAML file (replace 'path/to/your/file.yaml' with the actual file path)
  const filePath = '\my_files\\me.yaml';

  // Read the file content
  fs.readFile(filePath, 'utf-8', (err, yamlData) => {
    if (err) {
      console.error(`Error reading YAML file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse YAML content
    const parsedYaml = yaml.load(yamlData);

    // Set the appropriate headers for YAML
    res.header('Content-Type', 'application/yaml');
    res.status(200).send(parsedYaml);
  });
});

app.get('/txt', (req, res) => {
  // Read the TXT file (replace 'path/to/your/file.txt' with the actual file path)
  const filePath = '\my_files\\me.txt';

  // Read the file content
  fs.readFile(filePath, 'utf-8', (err, txtData) => {
    if (err) {
      console.error(`Error reading TXT file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Set the appropriate headers for TXT
    res.header('Content-Type', 'text/plain');
    res.status(200).send(txtData);
  });
});

app.get('/json', (req, res) => {
  // Read the JSON file (replace 'path/to/your/file.json' with the actual file path)
  const filePath = '\my_files\\me.json';

  // Read the file content
  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error(`Error reading JSON file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse JSON content
    const parsedJson = JSON.parse(jsonData);

    // Set the appropriate headers for JSON
    res.header('Content-Type', 'application/json');
    res.status(200).send(parsedJson);
  });
});

app.get('/csv', (req, res) => {
  // Read the CSV file (replace 'path/to/your/file.csv' with the actual file path)
  const filePath = '\my_files\\me.csv';

  // Read the file content
  fs.readFile(filePath, 'utf-8', (err, csvData) => {
    if (err) {
      console.error(`Error reading CSV file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Set the appropriate headers for CSV
    res.header('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  });
});


app.get("/otherRoute", (req, res) => {

res.send ({message: "This is the other route"});
});

app.post("/postrequest", (req, res) => {
    res.send({message: "You made a post request"})
});

const PORT =8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));