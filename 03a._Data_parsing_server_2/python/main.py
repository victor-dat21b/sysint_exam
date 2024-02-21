from fastapi import FastAPI
import requests


app = FastAPI()

@app.get("/fastapi")
def _():
    return {"message": [1, 2, 3, 4, 5]}


@app.get("/requestExpressXml")
def get_express_xml_data():
    json_answer = requests.get("http://127.0.0.1:8086/expressdata_xml").json()
    return json_answer

@app.get("/requestExpressCsv")
def get_express_csv_data():
    json_answer = requests.get("http://127.0.0.1:8086/expressdata_csv").json()
    return json_answer

@app.get("/requestExpressText")
def get_express_text_data():
    json_answer = requests.get("http://127.0.0.1:8086/expressdata_text").json()
    return json_answer

@app.get("/requestExpressYaml")
def get_express_yaml_data():
    json_answer = requests.get("http://127.0.0.1:8086/expressdata_yaml").json()
    return json_answer

@app.get("/requestExpressJson")
def get_express_json_data():
    json_answer = requests.get("http://127.0.0.1:8086/expressdata_json").json()
    return json_answer



@app.get("/restFastAPIxml")
def _():
    return {"message": [1, 2, 3, 4, 5]}
@app.get("/restFastAPIyaml")
def _():
    return {"message": [1, 2, 5, 4, 5]}
