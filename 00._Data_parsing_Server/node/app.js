import express from "express";
import fs from 'fs';
import yaml from 'js-yaml'; 

const app = express();
const dataHere = [];

app.get("/xml", (req, res) => {
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

app.get('/yaml', (req, res) => {
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

app.get('/txt', (req, res) => {
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

app.get('/json', (req, res) => {
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

app.get('/csv', (req, res) => {
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

app.get("/otherRoute", (req, res) => {
  res.send({ message: "This is the other route" });
});

app.post("/postrequest", (req, res) => {
  res.send({ message: "You made a post request" });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
