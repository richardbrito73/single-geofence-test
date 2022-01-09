#!/bin/sh

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Apply migrations"
python manage.py makemigrations

echo "Apply database migrations"
python manage.py migrate

echo "Starting server"
if [ $DEBUG ]; then
    python manage.py runserver 0.0.0.0:80
else
    gunicorn \
        --timeout 120 \
        --access-logfile - \
        --bind 0.0.0.0:80 \
        --workers 2 \
        pmf.wsgi:application
fi
