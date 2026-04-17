# Weather ETL Pipeline 🌤️

A Python-based ETL (Extract, Transform, Load) pipeline that extracts real-time weather forecast data from the OpenWeatherMap API, transforms it into a clean structured format, and loads it into a MySQL database running in a Docker container.

---

## Architecture

```
OpenWeatherMap API → extract.py → transform.py → load.py → MySQL (Docker)
```

---

## Features

- **Extract** — Fetches 5-day weather forecast data from OpenWeatherMap API with error handling
- **Transform** — Parses and cleans raw JSON response into structured records
- **Load** — Inserts clean data into a MySQL database using parameterized queries
- **Dockerized Database** — MySQL runs in a Docker container for portability
- **Secure Configuration** — All credentials managed via `.env` file, never hardcoded

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Python 3 |
| Data Source | OpenWeatherMap API |
| Database | MySQL 8 |
| Container | Docker |
| Libraries | requests, mysql-connector-python, python-dotenv |

---

## Database Schema

```sql
CREATE TABLE weather (
    id INT NOT NULL AUTO_INCREMENT,
    ciudad VARCHAR(50) NOT NULL,
    temperatura DECIMAL(5,2),
    humedad INT,
    prob_lluvia DECIMAL(3,2),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

---

## Project Structure

```
weather-etl-pipeline/
├── extract.py       # Connects to OpenWeatherMap API and returns raw JSON
├── transform.py     # Parses JSON and returns clean list of records
├── load.py          # Inserts records into MySQL using parameterized queries
├── main.py          # Orchestrates the ETL pipeline
├── .env.example     # Environment variables template
├── .gitignore       # Excludes .env and virtual environment
└── README.md
```

---

## ⚙️ Setup & Usage

### 1. Clone the repository
```bash
git clone https://github.com/enuharnunez203-arch/weather-etl-pipeline.git
cd weather-etl-pipeline
```

### 2. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install requests mysql-connector-python python-dotenv
```

### 4. Configure environment variables
Create a `.env` file based on `.env.example`:
```
API_KEY=your_openweathermap_api_key
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=etl_weather
```

### 5. Start MySQL Docker container
```bash
docker start mi-mysql
```

### 6. Run the pipeline
```bash
python main.py
```

---

## Security

- Credentials stored in `.env` — never committed to version control
- Database queries use parameterized statements to prevent SQL injection
- `.gitignore` configured to exclude sensitive files

---

## Sample Output

```
+----+-------------+-------------+---------+-------------+---------------------+
| id | ciudad      | temperatura | humedad | prob_lluvia | fecha_registro      |
+----+-------------+-------------+---------+-------------+---------------------+
|  1 | Guadalajara |       30.85 |      12 |        0.00 | 2026-04-17 21:33:26 |
|  2 | Guadalajara |       25.84 |      18 |        0.00 | 2026-04-17 21:33:26 |
|  3 | Guadalajara |       19.63 |      36 |        0.00 | 2026-04-17 21:33:26 |
+----+-------------+-------------+---------+-------------+---------------------+
```

---

## Key Learnings

- Designed and implemented a complete ETL pipeline from scratch
- Consumed a RESTful API and handled JSON data structures in Python
- Applied data security principles — parameterized queries and environment variables
- Deployed and managed a MySQL instance using Docker
- Structured a Python project with separation of concerns across modules

---

## Author

**Enuhar Gutierrez**  
Computer Systems Engineering Student — Tecnológico Superior de Jalisco  
[LinkedIn](https://www.linkedin.com/in/enuhar-nunez) · [GitHub](https://github.com/enuharnunez203-arch)
