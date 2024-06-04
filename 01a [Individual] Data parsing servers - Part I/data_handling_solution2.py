import csv
import json
import xml.etree.ElementTree as ET
import yaml #provided by the PyYAML package

def get_myself_from_file(file_path):
    if file_path.endswith('.csv'):
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            data = [row for row in reader]
    elif file_path.endswith('.json'):
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
    elif file_path.endswith('.xml'):
        with open(file_path, 'r', encoding='utf-8') as file:
            tree = ET.parse(file)
            root = tree.getroot()
            data = {child.tag: child.text for child in root}
    elif file_path.endswith('.yaml') or file_path.endswith('.yml'):
        with open(file_path, 'r', encoding='utf-8') as file:
            data = yaml.safe_load(file)
    else:
        raise ValueError(f"Forkert filformat: {file_path}")

    return data

def print_pretty(title, data):
    print(title)
    if isinstance(data, list):
        for item in data:
            print(item)
    elif isinstance(data, dict):
        for key, value in data.items():
            print(f"{key.capitalize()}: {value}")
    print('\n')

file_path_csv = 'me.csv'
file_path_json = 'me.json'
file_path_xml = 'me.xml'
file_path_yaml = 'me.yaml'

myself_from_csv = get_myself_from_file(file_path_csv)
myself_from_json = get_myself_from_file(file_path_json)
myself_from_xml = get_myself_from_file(file_path_xml)
myself_from_yaml = get_myself_from_file(file_path_yaml)

print_pretty("Mig fra CSV:", myself_from_csv)
print_pretty("Mig fra JSON:", myself_from_json)
print_pretty("Mig fra XML:", myself_from_xml)
print_pretty("Mig fra YAML:", myself_from_yaml)
