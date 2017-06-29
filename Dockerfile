FROM node:8-alpine

LABEL maintainer "Antoine Aumjaud <antoine_dev@aumjaud.fr>"

EXPOSE 9080

WORKDIR /home/app
COPY dist .
COPY node_modules node_modules
RUN mkdir logs

VOLUME ./conf
VOLUME ./logs

CMD node server.js > logs/api-nabaztag.txt
