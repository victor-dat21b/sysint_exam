import express from 'express';
import fs from 'fs';
import { parse } from 'csv-parse/sync'; // CSV parser
import { parseString } from 'xml2js';
import yaml from 'js-yaml';

const app = express();

app.get('/xml', (req, res) => {
  const filePath = 'my_files/me.xml'; // Ensure the correct file path

  fs.readFile(filePath, 'utf-8', (err, xmlData) => {
    if (err) {
      console.error(`Error reading XML file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    parseString(xmlData, (err, result) => {
      if (err) {
        console.error(`Error parsing XML file: ${err.message}`);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      res.header('Content-Type', 'application/json');
      res.status(200).json(result);
    });
  });
});

app.get('/yaml', (req, res) => {
  const filePath = 'my_files/me.yaml'; // Ensure the correct file path

  fs.readFile(filePath, 'utf-8', (err, yamlData) => {
    if (err) {
      console.error(`Error reading YAML file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const parsedYaml = yaml.load(yamlData);
      res.header('Content-Type', 'application/json');
      res.status(200).json(parsedYaml);
    } catch (err) {
      console.error(`Error parsing YAML file: ${err.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/txt', (req, res) => {
  const filePath = 'my_files/me.txt'; // Ensure the correct file path

  fs.readFile(filePath, 'utf-8', (err, txtData) => {
    if (err) {
      console.error(`Error reading TXT file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const lines = txtData.split('\r\n').filter(line => line.trim() !== '');
      const jsonData = {};
      lines.forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim().replace(/^"|"$/g, ''));
        jsonData[key] = value.startsWith('[') ? JSON.parse(value) : value;
      });
      res.header('Content-Type', 'application/json');
      res.status(200).json(jsonData);
    } catch (err) {
      console.error(`Error parsing TXT file: ${err.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/json', (req, res) => {
  const filePath = 'my_files/me.json'; // Ensure the correct file path

  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error(`Error reading JSON file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonData);
      res.header('Content-Type', 'application/json');
      res.status(200).json(parsedJson);
    } catch (err) {
      console.error(`Error parsing JSON file: ${err.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/csv', (req, res) => {
  const filePath = 'my_files/me.csv'; // Ensure the correct file path

  fs.readFile(filePath, 'utf-8', (err, csvData) => {
    if (err) {
      console.error(`Error reading CSV file: ${err.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
      });

      res.header('Content-Type', 'application/json');
      res.status(200).json(records);
    } catch (err) {
      console.error(`Error parsing CSV file: ${err.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/otherRoute', (req, res) => {
  res.json({ message: 'This is the other route' });
});

app.post('/postrequest', (req, res) => {
  res.json({ message: 'You made a post request' });
});

const PORT = 8080;
app.listen(PORT, () => console.log('Server is running on port', PORT));
