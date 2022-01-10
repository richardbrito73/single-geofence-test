FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0

RUN apt-get update

ADD requirements.txt /usr/local/share/requirements.txt
RUN pip install -U pip
RUN pip install -r /usr/local/share/requirements.txt

ADD ./ /var/www/
WORKDIR /var/www/

RUN useradd richardbrito73
USER richardbrito73

COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
