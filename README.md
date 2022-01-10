# Geofence Test

Run Api <br>
[URL HERE](https://test-geofencing-gm-api.herokuapp.com/api/v1/tracking/)
```bash
cd geoapi
# With Pipenv
pipenv install
# With PIP (Virutal environment needs to be created)
pip install -r requirements.txt
# Run
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

# DOCKER
docker-compose up
```
Run App: <br>
[URL HERE](https://test-geofencing-gm.herokuapp.com)
```bash
cd geoapp
npm install
npm start
```
`Please, check the .env files to know the variables that need to be set up in both projects...`
