def transform_data(data):
    resultados = []
    ciudad = data["city"]["name"]

    for pronostico in data["list"]:
        temperature = pronostico["main"]["temp"]
        humidity = pronostico["main"]["humidity"]
        rain = pronostico.get("pop",0.0)
        clean_data = {"ciudad":ciudad,"temperatura":temperature,"humedad":humidity,"prob_lluvia":rain}
        resultados.append(clean_data)
    return resultados
    
