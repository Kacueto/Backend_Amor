FROM node:alpine

RUN mkdir -p /src 
WORKDIR /src

RUN npm install --global nodemon

COPY package*.json ./
RUN npm install --quiet --no-optional

EXPOSE 2600

CMD nodemon app.js