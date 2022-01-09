FROM python:3.9

RUN apt-get update

ADD requirements.txt /usr/local/share/requirements.txt
RUN pip install -U pip
RUN pip install -r /usr/local/share/requirements.txt

ADD ./ /var/www/
WORKDIR /var/www/

ENV DB_PASSWORD $DB_PASSWORD

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
