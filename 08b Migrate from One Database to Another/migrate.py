import mysql.connector
from pymongo import MongoClient


mysql_conn = mysql.connector.connect(
    host="127.0.0.1",
    port=3306, 
    user="root",
    password="12345",
    database="electradrive"
)


mongo_client = MongoClient("mongodb://localhost:27017/")
mongo_db = mongo_client["migrate_task"]
mongo_collection = mongo_db["cars"]


mysql_cursor = mysql_conn.cursor(dictionary=True)
mysql_cursor.execute("SELECT * FROM customers")


for row in mysql_cursor:
    transformed_data = {
        "customer_id": row["customer_id"],
        "name": row["name"],
        "email": row["email"],
        "address": row["address"],
        "car_id": row["car_Id"],
    }
    mongo_collection.insert_one(transformed_data)

mysql_cursor.close()
mysql_conn.close()
mongo_client.close()

