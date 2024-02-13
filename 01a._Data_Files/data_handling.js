const fs = require('fs');
const Papa = require('papaparse');
const xml2js = require('xml2js');
const yaml = require('js-yaml');

//CSV fil
function readCSV(filePath) {
  const csvData = fs.readFileSync(filePath, 'utf8');
  
  Papa.parse(csvData, {
    header: true,
    complete: (result) => {
      console.log('Mig fra CSV:', result.data);
    },
    error: (error) => {
      console.error('Error fra CSV:', error.message);
    }
  });
}

//JSON fil
function readJSON(filePath) {
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  console.log('Mig fra JSON:', data);
}

//XML fil
function readXML(filePath) {
  const xmlData = fs.readFileSync(filePath, 'utf8');
  xml2js.parseString(xmlData, (err, result) => {
    console.log('Mig fra XML:', result.me);
  });
}

//Yaml fil
function readYAML(filePath) {
  const yamlData = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(yamlData);

  console.log('Mig fra YAML:', data);
}


readCSV('me.csv');
readJSON('me.json');
readXML('me.xml');
readYAML('me.yaml');
