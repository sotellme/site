FROM python:3

WORKDIR /backend
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ADD backend.py ./

EXPOSE 8080
CMD [ "python", "/backend/backend.py" ]
