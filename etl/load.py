import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

def load_data(registros):
    conexion = mysql.connector.connect(
            host = os.getenv("DB_HOST"),
            user = os.getenv("DB_USER"),
            password = os.getenv("DB_PASSWORD"),
            database = os.getenv("DB_NAME")
    )
    cursor = conexion.cursor()

    sql = "INSERT INTO weather (ciudad, temperatura, humedad, prob_lluvia) VALUES (%s,%s,%s,%s)"

    for registro in registros:
        valores = (registro["ciudad"], registro["temperatura"],registro["humedad"],registro["prob_lluvia"])
        cursor.execute(sql,valores)

    conexion.commit()
    cursor.close()
    conexion.close()
