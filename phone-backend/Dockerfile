FROM python:3

WORKDIR /backend
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ADD backend.py backend_rest.py main.py sensitive.py ./

EXPOSE 8080
CMD [ "python", "/backend/main.py" ]
