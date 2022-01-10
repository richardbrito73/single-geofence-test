#!/bin/sh

echo "Apply migrations"
python manage.py makemigrations

echo "Apply database migrations"
python manage.py migrate

echo "Starting server"
if [ $DEBUG ]; then
    python manage.py runserver 0.0.0.0:$PORT
else
    gunicorn \
        --timeout 120 \
        --access-logfile - \
        --bind 0.0.0.0:$PORT \
        --workers 2 \
        pmf.wsgi:application
fi
