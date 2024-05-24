import { readFileSync } from 'fs';
import pkg from 'papaparse';
import { parseString } from 'xml2js';
import { load } from 'js-yaml';

const { parse } = pkg;

// CSV fil
function readCSV(filePath) {
  const csvData = readFileSync(filePath, 'utf8');
  
  parse(csvData, {
    header: true,
    complete: (result) => {
      console.log('Mig fra CSV:', result.data);
    },
    error: (error) => {
      console.error('Error fra CSV:', error.message);
    }
  });
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
