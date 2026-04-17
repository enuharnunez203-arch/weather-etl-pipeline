from dotenv import load_dotenv
import requests
import os

load_dotenv()

api_key = os.getenv("API_KEY")
url = f"https://api.openweathermap.org/data/2.5/forecast?q=Guadalajara,MX&appid={api_key}&units=metric&lang=es"



def extract_data():
    try:
        response = requests.get(url)
        response.raise_for_status()  # Verificar si la solicitud fue exitosa
        return response.json()
    except requests.RequestException as http_err:
        print(f"Error al obtener los datos del clima: {http_err}")
        return None
    
if __name__ == "__main__":
    data = extract_data()
    if data:
        print("conexion exitosa")
        print(data)
    else:
        print("No se pudieron obtener los datos del clima.")


