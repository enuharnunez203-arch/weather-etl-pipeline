FROM python:3.11-alpine
WORKDIR /app
COPY . .
RUN pip install flask requests
EXPOSE 5000
CMD ["python", "backend/app.py"]