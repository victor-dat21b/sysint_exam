import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync'; // Using the csv-parse library
import { parseString } from 'xml2js';
import { load } from 'js-yaml';

// CSV fil
function readCSV(filePath) {
  const csvData = readFileSync(filePath, 'utf8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
  console.log('Mig fra CSV:', records);
}

// JSON fil
function readJSON(filePath) {
  const jsonData = readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  console.log('Mig fra JSON:', data);
}

// XML fil
function readXML(filePath) {
  const xmlData = readFileSync(filePath, 'utf8');
  parseString(xmlData, (err, result) => {
    if (err) {
      console.error('Error fra XML:', err.message);
    } else {
      const parsedData = result.me;
      const formattedData = {
        name: parsedData.name[0],
        age: parsedData.age[0],
        hobbies: parsedData.hobbies[0].hobby
      };
      console.log('Mig fra XML:', formattedData);
    }
  });
}

// Yaml fil
function readYAML(filePath) {
  const yamlData = readFileSync(filePath, 'utf8');
  const data = load(yamlData);
  console.log('Mig fra YAML:', data);
}

readCSV('me.csv');
readJSON('me.json');
readXML('me.xml');
readYAML('me.yaml');
