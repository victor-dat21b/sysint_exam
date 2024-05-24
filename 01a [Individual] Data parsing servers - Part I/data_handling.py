import pandas as panda
import xmltodict
import yaml


def get_myself_from_file(file_path):
    if file_path.endswith('.csv'):
        data = panda.read_csv(file_path)
    elif file_path.endswith('.json'):
        data = panda.read_json(file_path)
    elif file_path.endswith('.xml'):
        with open(file_path, 'r') as file:
            data = xmltodict.parse(file.read())
    elif file_path.endswith('.yaml') or file_path.endswith('.yml'):
        with open(file_path, 'r') as file:
            data = yaml.safe_load(file)
    else:
        raise ValueError(f"Forkert filformat: {file_path}")

    return data

file_path_csv = 'me.csv'
file_path_json = 'me.json'
file_path_xml = 'me.xml'
file_path_yaml = 'me.yaml'

myself_from_csv = get_myself_from_file(file_path_csv)
myself_from_json = get_myself_from_file(file_path_json)
myself_from_xml = get_myself_from_file(file_path_xml)
myself_from_yaml = get_myself_from_file(file_path_yaml)

print("Mig fra CSV:" + '\n', myself_from_csv)
print('\n' + "Mig fra JSON:" + '\n', myself_from_json)
print('\n' + "Mig fra XML:" + '\n', panda.DataFrame(myself_from_xml))
print('\n' + "Mig fra YAML:" + '\n', panda.DataFrame([myself_from_yaml]))
