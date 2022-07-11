FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

CMD ["npm", "run", "start:dev"]

EXPOSE 8080