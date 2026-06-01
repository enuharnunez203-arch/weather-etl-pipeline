from extract import extract_data
from transform import transform_data
from load import load_data

def main():
    data = extract_data()
    registros = transform_data(data)
    load_data(registros)
    print("ETL completado correctamente")

if __name__ == "__main__":
    main()

