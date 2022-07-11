FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

CMD ["npm", "start"]

EXPOSE 8080