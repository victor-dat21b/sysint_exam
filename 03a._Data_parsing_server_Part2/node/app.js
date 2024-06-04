import express from "express"
import fs from 'fs';
import yaml from 'js-yaml'; 


const app = express();

const PORT = 8086;
app.listen(PORT, () => console.log("Server is running on port" + PORT))


app.get("/restFastAPI", async (req, res) => {
    const response = await fetch("127.0.0.1:8000/fastapi") //Ikke brug localhost, men brug http eller 127 adresse.
    const result = await response.json()
    res.send ({result}) 
});




app.get("/expressdata_xml", (req, res) => {
  const filePath = '\my_files\\me.xml';

  // Read the XML file
  fs.readFile(filePath, 'utf-8', (err, xmlData) => {
    if (err) {
      console.error(`Error reading XML file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Convert XML to JSON
    const jsonData = JSON.stringify(xmlData);

    // Set the appropriate headers for JSON
    res.header('Content-Type', 'application/json');
    res.status(200).send(jsonData);
  });
});

app.get('/expressdata_yaml', (req, res) => {
  const filePath = '\my_files\\me.yaml';

  // Read the YAML file
  fs.readFile(filePath, 'utf-8', (err, yamlData) => {
    if (err) {
      console.error(`Error reading YAML file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse YAML content
    const parsedYaml = yaml.load(yamlData);

    // Convert YAML to JSON
    const jsonData = JSON.stringify(parsedYaml);

    // Set the appropriate headers for JSON
    res.header('Content-Type', 'application/json');
    res.status(200).send(jsonData);
  });
});

app.get('/expressdata_txt', (req, res) => {
  const filePath = '\my_files\\me.txt';

  // Read the TXT file
  fs.readFile(filePath, 'utf-8', (err, txtData) => {
    if (err) {
      console.error(`Error reading TXT file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Convert TXT to JSON
    const jsonData = JSON.stringify({ content: txtData });

    // Set the appropriate headers for JSON
    res.header('Content-Type', 'application/json');
    res.status(200).send(jsonData);
  });
});

app.get('/expressdata_json', (req, res) => {
  const filePath = '\my_files\\me.json';

  // Read the JSON file
  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error(`Error reading JSON file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Set the appropriate headers for JSON
    res.header('Content-Type', 'application/json');
    res.status(200).send(jsonData);
  });
});

app.get('/expressdata_csv', (req, res) => {
  const filePath = '\my_files\\me.csv';

  // Read the CSV file
  fs.readFile(filePath, 'utf-8', (err, csvData) => {
    if (err) {
      console.error(`Error reading CSV file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Convert CSV to JSON
    const jsonData = JSON.stringify(csvData);

    // Set the appropriate headers for JSON
    res.header('Content-Type', 'application/json');
    res.status(200).send(jsonData);
  });
});
















/*
app.get("/restFastAPI/:param", async (req, res) => {
    const param = req.params.param;
    const url = `127.0.0.1:8000/fastapi/${param}`; // Modify the URL with the parameter

    try {
        const response = await fetch(url);
        const result = await response.json();
        res.send({ result });
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});
*/



