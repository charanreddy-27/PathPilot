FROM rasa/rasa:3.6.2

USER root

WORKDIR /app

COPY . .

RUN rasa train

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*"] 